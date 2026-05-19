"""Backend tests for Kiki Centre Admissions API."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://join-kiki.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Root ----
class TestRoot:
    def test_root(self, session):
        r = session.get(f"{API}/", timeout=20)
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "Kiki" in data["message"]


# ---- Admission ----
class TestAdmission:
    def test_apply_missing_fields_422(self, session):
        r = session.post(f"{API}/admission/apply", json={"full_name": "Test"}, timeout=20)
        assert r.status_code == 422

    def test_apply_invalid_email_422(self, session):
        payload = {
            "full_name": "TEST User",
            "email": "not-an-email",
            "phone": "9999999999",
            "qualification": "Class 12",
            "course": "Tool & Die Making",
        }
        r = session.post(f"{API}/admission/apply", json=payload, timeout=20)
        assert r.status_code == 422

    def test_apply_success_and_list(self, session):
        unique = uuid.uuid4().hex[:8]
        payload = {
            "full_name": f"TEST Applicant {unique}",
            "email": f"test_{unique}@example.com",
            "phone": "+91 9999988888",
            "qualification": "Class 12",
            "course": "Mechatronics (Automation & Robotics)",
            "city": "Gurgaon",
            "state": "Haryana",
            "year_of_passing": "2024",
            "message": "TEST submission",
            "referral_source": "Google / Search",
        }
        r = session.post(f"{API}/admission/apply", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        body = r.json()
        assert "_id" not in body
        assert body["full_name"] == payload["full_name"]
        assert body["email"] == payload["email"]
        assert body["course"] == payload["course"]
        assert "id" in body and isinstance(body["id"], str)
        assert "created_at" in body

        # verify persistence
        r2 = session.get(f"{API}/admission/applications", timeout=20)
        assert r2.status_code == 200
        rows = r2.json()
        assert isinstance(rows, list)
        assert all("_id" not in row for row in rows)
        match = [x for x in rows if x.get("email") == payload["email"]]
        assert len(match) >= 1


# ---- AI Chat ----
class TestAIChat:
    def test_chat_returns_reply(self, session):
        sid = f"test-{uuid.uuid4().hex[:10]}"
        r = session.post(
            f"{API}/ai/chat",
            json={"session_id": sid, "message": "What courses do you offer?"},
            timeout=90,
        )
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["session_id"] == sid
        assert isinstance(data["reply"], str)
        assert len(data["reply"]) > 20

    def test_chat_session_persistence(self, session):
        sid = f"test-{uuid.uuid4().hex[:10]}"
        r1 = session.post(
            f"{API}/ai/chat",
            json={"session_id": sid, "message": "I am interested in Tool & Die Making."},
            timeout=90,
        )
        assert r1.status_code == 200
        r2 = session.post(
            f"{API}/ai/chat",
            json={"session_id": sid, "message": "How long is the course?"},
            timeout=90,
        )
        assert r2.status_code == 200
        assert len(r2.json()["reply"]) > 10
