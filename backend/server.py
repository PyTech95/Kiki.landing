from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')

app = FastAPI(title="Kiki Centre Admissions API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class AdmissionApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: Optional[EmailStr] = None
    phone: str
    qualification: str  # "10th" | "12th" | "ITI" | "Diploma" | "Degree"
    course: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    year_of_passing: Optional[str] = None
    interested_in_streams: Optional[str] = None  # "Yes" / "No"
    message: Optional[str] = None
    referral_source: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class AdmissionApplicationCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    email: Optional[EmailStr] = None
    phone: str = Field(min_length=7, max_length=20)
    qualification: str
    course: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    year_of_passing: Optional[str] = None
    interested_in_streams: Optional[str] = None
    message: Optional[str] = None
    referral_source: Optional[str] = None


class ChatMessageIn(BaseModel):
    session_id: str
    message: str = Field(min_length=1, max_length=4000)


class ChatMessageOut(BaseModel):
    session_id: str
    reply: str


# ---------- Routes ----------

@api_router.get("/")
async def root():
    return {"message": "Kiki Centre Admissions API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    obj = StatusCheck(**input.model_dump())
    doc = obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get('timestamp'), str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
    return rows


@api_router.post("/admission/apply", response_model=AdmissionApplication)
async def submit_application(payload: AdmissionApplicationCreate):
    obj = AdmissionApplication(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.admission_applications.insert_one(doc)
    logger.info(f"New admission application: {obj.full_name} - {obj.course}")
    return obj


@api_router.get("/admission/applications", response_model=List[AdmissionApplication])
async def list_applications():
    rows = await db.admission_applications.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for r in rows:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return rows


SYSTEM_PROMPT = """You are Kiki AI, the friendly admission assistant for Kiki Centre for Technology — a premier vocational training institute located in Gurgaon, Delhi-NCR, India, in association with the German Chamber of Skilled Crafts (HWK), Koblenz, Germany.

ABOUT KIKI CENTRE:
- 25,000 sq ft state-of-the-art training centre with German-designed curriculum
- "We make the people who will make in India"
- Admissions Open for 2026

LONG TERM COURSES (3.5 years, German-certified diploma):
1. Tool & Die Making (Manufacturing & Designing) — Mechanical stream
2. Precision Machining Technology — Mechanical stream
3. Mechatronics (Automation & Robotics) — Electrical & Electronics stream

ELIGIBILITY: Class 10 pass OR Class 12 pass (any stream/subject)

KEY USPs:
- EARN WHILE YOU LEARN: From the 2nd year, students receive stipend/training allowance during on-job training with partner companies (Maruti Suzuki, Honda, Mitsubishi Electric, Subros, Bridgestone, IFB, Stryker, Asahi Glass, Denso, Faurecia, etc.)
- German Dual Model (Berufsschule) training
- Internationally certified by German Chamber of Skilled Crafts, Koblenz
- Scholarship & financial aid available
- 2 years on-job industry experience built into the course
- Short term courses (2 weeks to 11 months) also offered for ITI/Diploma/Degree holders
- Corporate training programs available

CONTACT: Call +91 8800288994 | Located at Gurgaon, Delhi-NCR

GUIDELINES:
- Be warm, encouraging, and helpful — many students/parents are first-time inquirers.
- Keep answers concise (2-4 short paragraphs max) and use bullet points when listing.
- Always end with a soft CTA: invite them to fill the admission form on this page, or to call +91 8800288994, or to WhatsApp us.
- If asked about fees or specific dates, say the admission counsellor will share exact figures via WhatsApp/call, and encourage them to apply or chat on WhatsApp.
- If the question is unrelated to Kiki Centre, politely steer back to admissions/courses.
- Never invent statistics or claim things not listed above.
- Respond in the same language the user wrote in (English or Hindi).
"""


@api_router.post("/ai/chat", response_model=ChatMessageOut)
async def ai_chat(payload: ChatMessageIn):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")

    session_id = payload.session_id or str(uuid.uuid4())

    # Store user message
    await db.chat_messages.insert_one({
        "id": str(uuid.uuid4()),
        "session_id": session_id,
        "role": "user",
        "content": payload.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=SYSTEM_PROMPT,
        ).with_model("anthropic", "claude-sonnet-4-5-20250929")

        reply = await chat.send_message(UserMessage(text=payload.message))
        reply_text = str(reply) if reply is not None else "I'm here to help. Could you rephrase that?"
    except Exception as e:
        logger.exception("AI chat error")
        raise HTTPException(status_code=502, detail=f"AI service error: {str(e)}")

    await db.chat_messages.insert_one({
        "id": str(uuid.uuid4()),
        "session_id": session_id,
        "role": "assistant",
        "content": reply_text,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    return ChatMessageOut(session_id=session_id, reply=reply_text)


# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
