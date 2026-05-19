# Kiki Centre — Admission Landing Page (PRD)

## Original Problem Statement
> https://kikicentre.com/ and https://kikicentre.com/kikicentre/
> Now make a landing page for admission apply — full modern and maximum CTA.
> AI admission assistance as well — whatsapp button and all.
> And don't place "Made with Emergent" on right bottom.

## Architecture
- Backend: FastAPI + MongoDB (motor). LLM via `emergentintegrations` → Claude Sonnet 4.5 (`claude-sonnet-4-5-20250929`).
- Frontend: React 19 + React Router + TailwindCSS + Shadcn UI + Sonner toasts.
- Single-page landing at `/` with anchor-scrolling sections.

## Personas
1. **Class 10 / 12 student (16–19 yr)** — primary applicant, mobile-first.
2. **Parent / guardian** — needs trust signals, fees-availability info, easy phone/WhatsApp.
3. **ITI / Diploma holder** — short-term courses & corporate training enquiries.

## Core Requirements (static)
- Modern, conversion-focused landing page in Swiss/High-Contrast industrial aesthetic.
- Maximum CTAs across the page (Apply Now, Call, WhatsApp).
- Multi-step Admission Application Form persisted to MongoDB.
- Floating AI Admission Assistant (Claude Sonnet 4.5).
- Floating WhatsApp button (green).
- "Made with Emergent" badge removed (HTML + CSS + runtime MutationObserver).

## What's Been Implemented (2025-12-19)
- Backend
  - `POST /api/admission/apply` — saves application with Pydantic+EmailStr validation.
  - `GET  /api/admission/applications` — admin list (no `_id` leak).
  - `POST /api/ai/chat` — session-based Claude Sonnet 4.5 chat; messages logged to `chat_messages`.
  - `GET  /api/`, `POST/GET /api/status` (template endpoints).
  - `EMERGENT_LLM_KEY` added to `/app/backend/.env`.
- Frontend
  - Pages: `Landing.jsx`.
  - Components: `Navbar`, `Hero`, `StatsStrip`, `EarnSection`, `CoursesSection`, `WhySection`, `PartnersStrip` (animated marquee), `AdmissionForm` (3-step), `Testimonials`, `FaqSection` (Shadcn accordion), `CtaBand`, `Footer`, `StickyMobileCTA`, `WhatsAppButton`, `AIAssistant`.
  - Cabinet Grotesk (Fontshare) for display, IBM Plex Sans for body.
  - Brand colors: slate-950 ink, yellow-400 accent, sky-700 industrial blue, emerald success.
  - Made-with-Emergent badge removed from `public/index.html`, hidden via CSS, and pruned at runtime via MutationObserver.
- Testing
  - 100% pass (backend pytest + frontend Playwright). Test report at `/app/test_reports/iteration_1.json`.

## Backlog (next steps)
### P0
- Real WhatsApp number confirmation (currently `+91 8800288994`/`918800288994` from kikicentre.com — confirm with client).
- Replace stock student/workshop imagery with actual Kiki campus photos.

### P1
- Admin dashboard to view/export admission applications (CSV download).
- Email/WhatsApp notification to counsellor on new application (Resend or Twilio).
- Course-page deep links (separate routes per course with detailed curriculum).
- Captcha / honeypot on admission form to block bots.
- Multi-language (English + Hindi) toggle for landing copy.

### P2
- Schedule a campus visit calendar (Shadcn Calendar + slot picker).
- Scholarship eligibility quick-check wizard.
- Analytics: track CTA clicks & funnel conversion (PostHog already loaded in index.html).
- Pixel + GTM hooks for paid-ad attribution.
- SEO meta + OG cards per course; structured-data JSON-LD for Course schema.

## Notes / Tech Debt (from code-review by testing agent)
- Move `logger = logging.getLogger(__name__)` above route definitions in `server.py`.
- Consider Pydantic `Literal` / Enum validation for `course` and `qualification`.
- `CORSMiddleware` uses `allow_origins=*` with `allow_credentials=True` — fine while we have no auth, revisit when adding admin login.

## Next Action Items
- Confirm real WhatsApp & admin email with client.
- Add admin listing/export page (if requested).
- Replace placeholder stock images with actual Kiki Centre photos.
