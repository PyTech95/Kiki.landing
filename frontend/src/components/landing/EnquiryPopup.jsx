import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { X, ArrowRight, Loader2, Gift, Clock, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const STORAGE_KEY = "kiki_enquiry_popup_seen";
const DELAY_MS = 10000;

const COURSES = [
  "Tool & Die Making",
  "Precision Machining Technology",
  "Mechatronics (Automation & Robotics)",
  "Short Term Course",
  "Not sure — guide me",
];

export default function EnquiryPopup() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    course: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Only show once per session
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === "1") return;

    const t = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  // Lock scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const setField = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.full_name || form.full_name.trim().length < 2)
      e.full_name = "Please enter your name.";
    if (!form.phone || form.phone.replace(/\D/g, "").length < 7)
      e.phone = "Enter a valid phone number.";
    if (!form.course) e.course = "Pick a course of interest.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Invalid email.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await axios.post(`${API}/admission/apply`, {
        full_name: form.full_name,
        phone: form.phone,
        email: form.email || `lead+${Date.now()}@kikicentre.com`,
        course: form.course,
        qualification: "Not specified",
        referral_source: "Pop-up enquiry",
      });
      setDone(true);
      toast.success("Thank you! Our counsellor will call you within 24 hours.");
      // Auto-close after success
      setTimeout(() => close(), 2400);
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.detail || "Could not submit. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      data-testid="enquiry-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-popup-title"
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm reveal-up"
        style={{ animationDuration: "0.35s" }}
        onClick={close}
      />

      {/* Card */}
      <div
        className="relative w-full sm:max-w-md bg-white border border-slate-900 shadow-2xl reveal-up"
        style={{ animationDuration: "0.4s" }}
      >
        {/* Close */}
        <button
          type="button"
          onClick={close}
          aria-label="Close enquiry"
          data-testid="enquiry-popup-close"
          className="absolute top-3 right-3 h-9 w-9 grid place-items-center bg-white border border-slate-200 hover:bg-slate-100 z-10"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Yellow header banner */}
        <div className="relative bg-yellow-400 px-6 sm:px-8 pt-7 pb-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 h-32 w-32 bg-slate-950/10 rounded-full blur-2xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-slate-950 text-yellow-400 text-[10px] font-bold uppercase tracking-[0.18em]">
              <Sparkles className="h-3 w-3" /> Free Counselling
            </div>
            <h2
              id="enquiry-popup-title"
              className="font-display mt-3 text-2xl sm:text-3xl font-black tracking-tighter text-slate-950 leading-[1.05]"
            >
              Talk to an admission expert — <span className="underline decoration-[3px] underline-offset-2">free</span>.
            </h2>
            <p className="mt-2 text-sm text-slate-900/80">
              Get scholarship details, course-fit advice and batch dates for{" "}
              <strong>2026 Admissions</strong>.
            </p>
          </div>
        </div>

        <div className="px-6 sm:px-8 py-6">
          {done ? (
            <div data-testid="enquiry-popup-success" className="text-center py-4">
              <div className="mx-auto h-14 w-14 grid place-items-center bg-emerald-100 text-emerald-700 mb-4">
                <Gift className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-950">
                You're on the list!
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Our counsellor will call <strong>{form.phone}</strong> within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <Field label="Full Name *" error={errors.full_name}>
                <Input
                  data-testid="popup-name"
                  value={form.full_name}
                  onChange={(e) => setField("full_name", e.target.value)}
                  placeholder="Your name"
                  className="h-11 rounded-none border-slate-300 focus-visible:ring-slate-900"
                />
              </Field>

              <Field label="Phone Number *" error={errors.phone}>
                <Input
                  data-testid="popup-phone"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="+91 9XXXXXXXXX"
                  className="h-11 rounded-none border-slate-300 focus-visible:ring-slate-900"
                />
              </Field>

              <Field label="Email (optional)" error={errors.email}>
                <Input
                  data-testid="popup-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="you@example.com"
                  className="h-11 rounded-none border-slate-300 focus-visible:ring-slate-900"
                />
              </Field>

              <Field label="Course of Interest *" error={errors.course}>
                <Select
                  value={form.course}
                  onValueChange={(v) => setField("course", v)}
                >
                  <SelectTrigger
                    data-testid="popup-course"
                    className="h-11 rounded-none border-slate-300 focus:ring-slate-900"
                  >
                    <SelectValue placeholder="Choose your course" />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <button
                type="submit"
                disabled={submitting}
                data-testid="popup-submit"
                className="btn-yellow w-full inline-flex items-center justify-center gap-2 h-12 font-bold uppercase tracking-wider text-sm disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Request a Call Back
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <Clock className="h-3 w-3" />
                Our team typically calls within{" "}
                <strong className="text-slate-900">24 hours</strong>.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <Label className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700">
        {label}
      </Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
