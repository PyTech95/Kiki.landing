import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Send,
  ShieldCheck,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const COURSES = [
  "Tool & Die Making",
  "Precision Machining Technology",
  "Mechatronics (Automation & Robotics)",
  "Short Term Course",
  "Not sure — guide me",
];

const QUALIFICATIONS = ["Class 10", "Class 12", "ITI", "Diploma", "Degree"];
const SOURCES = [
  "Google / Search",
  "Instagram / Facebook",
  "WhatsApp / Friend",
  "Existing Student",
  "Newspaper / Event",
  "Other",
];

const initialState = {
  full_name: "",
  email: "",
  phone: "",
  qualification: "",
  course: "",
  city: "",
  state: "",
  year_of_passing: "",
  message: "",
  referral_source: "",
};

export default function AdmissionForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});

  const setField = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!form.full_name || form.full_name.trim().length < 2)
        e.full_name = "Please enter your full name.";
      if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email))
        e.email = "Please enter a valid email.";
      if (!form.phone || form.phone.replace(/\D/g, "").length < 7)
        e.phone = "Please enter a valid phone number.";
    } else if (step === 2) {
      if (!form.qualification) e.qualification = "Select your qualification.";
      if (!form.course) e.course = "Select a course of interest.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(3, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    try {
      await axios.post(`${API}/admission/apply`, form);
      setDone(true);
      toast.success("Application submitted! Our counsellor will contact you within 24 hours.");
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.detail?.[0]?.msg ||
          err?.response?.data?.detail ||
          "Could not submit. Please try again or call us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const progressPct = done ? 100 : ((step - 1) / 3) * 100 + 16;

  return (
    <section id="apply" data-testid="admission-form-section" className="py-16 sm:py-24 lg:py-28 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-noise opacity-[0.07] pointer-events-none" />
      <div className="absolute -top-20 -left-20 h-72 w-72 bg-yellow-400/10 blur-3xl rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-start">
        {/* Left — context */}
        <div className="lg:col-span-5">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
            Admissions Open · 2025
          </div>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-balance">
            One form. <br />
            <span className="text-yellow-400">A real career.</span>
          </h2>
          <p className="mt-5 text-slate-300 text-base sm:text-lg leading-relaxed max-w-md">
            Fill this short form and our admission counsellor will call you back
            within 24 hours with your course plan, scholarship eligibility and
            campus visit details.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "Free counselling session",
              "Scholarship & financial aid review",
              "Campus visit invitation",
              "Direct guidance from our team",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm sm:text-base text-slate-200">
                <CheckCircle2 className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs text-slate-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Your details stay private. No spam, ever.
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-7 bg-white text-slate-950 border border-slate-200 shadow-xl">
          {/* progress */}
          <div className="h-1.5 w-full bg-slate-200">
            <div
              className="h-full bg-yellow-400 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="p-6 sm:p-10">
            {done ? (
              <div data-testid="admission-success" className="text-center py-8">
                <div className="mx-auto h-16 w-16 grid place-items-center bg-emerald-100 text-emerald-700 mb-5">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-3xl font-bold text-slate-950">
                  You're in our list!
                </h3>
                <p className="mt-3 text-slate-600 max-w-md mx-auto">
                  Thank you, {form.full_name.split(" ")[0]}. An admission counsellor
                  will reach out to <strong>{form.phone}</strong> within 24 hours.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href="https://wa.me/918800288994"
                    target="_blank"
                    rel="noreferrer"
                    data-testid="success-whatsapp-button"
                    className="btn-yellow inline-flex items-center px-5 h-11 font-bold uppercase tracking-wider text-sm"
                  >
                    Chat on WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setForm(initialState);
                      setDone(false);
                      setStep(1);
                    }}
                    className="inline-flex items-center px-5 h-11 border-2 border-slate-900 text-slate-900 font-bold uppercase tracking-wider text-sm hover:bg-slate-900 hover:text-white transition-colors"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-700">
                      Step {step} of 3
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold mt-1 tracking-tight">
                      {step === 1 && "Tell us about you"}
                      {step === 2 && "Pick your course"}
                      {step === 3 && "Almost done"}
                    </h3>
                  </div>
                  <div className="hidden sm:flex gap-1.5">
                    {[1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className={`h-2 w-8 ${
                          i <= step ? "bg-slate-950" : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {step === 1 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name *" error={errors.full_name}>
                      <Input
                        data-testid="form-full-name"
                        value={form.full_name}
                        onChange={(e) => setField("full_name", e.target.value)}
                        placeholder="Your name"
                        className="h-12 rounded-none border-slate-300 focus-visible:ring-slate-900"
                      />
                    </Field>
                    <Field label="Phone Number *" error={errors.phone}>
                      <Input
                        data-testid="form-phone"
                        value={form.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        placeholder="+91 9XXXXXXXXX"
                        className="h-12 rounded-none border-slate-300 focus-visible:ring-slate-900"
                      />
                    </Field>
                    <Field label="Email *" error={errors.email} className="sm:col-span-2">
                      <Input
                        data-testid="form-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        placeholder="you@example.com"
                        className="h-12 rounded-none border-slate-300 focus-visible:ring-slate-900"
                      />
                    </Field>
                    <Field label="City" className="sm:col-span-1">
                      <Input
                        data-testid="form-city"
                        value={form.city}
                        onChange={(e) => setField("city", e.target.value)}
                        placeholder="Gurgaon"
                        className="h-12 rounded-none border-slate-300 focus-visible:ring-slate-900"
                      />
                    </Field>
                    <Field label="State">
                      <Input
                        data-testid="form-state"
                        value={form.state}
                        onChange={(e) => setField("state", e.target.value)}
                        placeholder="Haryana"
                        className="h-12 rounded-none border-slate-300 focus-visible:ring-slate-900"
                      />
                    </Field>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Your Qualification *" error={errors.qualification}>
                      <Select
                        value={form.qualification}
                        onValueChange={(v) => setField("qualification", v)}
                      >
                        <SelectTrigger
                          data-testid="form-qualification"
                          className="h-12 rounded-none border-slate-300 focus:ring-slate-900"
                        >
                          <SelectValue placeholder="Select qualification" />
                        </SelectTrigger>
                        <SelectContent>
                          {QUALIFICATIONS.map((q) => (
                            <SelectItem key={q} value={q}>
                              {q}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Year of Passing">
                      <Input
                        data-testid="form-year"
                        value={form.year_of_passing}
                        onChange={(e) => setField("year_of_passing", e.target.value)}
                        placeholder="e.g. 2024"
                        className="h-12 rounded-none border-slate-300 focus-visible:ring-slate-900"
                      />
                    </Field>
                    <Field label="Course of Interest *" error={errors.course} className="sm:col-span-2">
                      <Select
                        value={form.course}
                        onValueChange={(v) => setField("course", v)}
                      >
                        <SelectTrigger
                          data-testid="form-course"
                          className="h-12 rounded-none border-slate-300 focus:ring-slate-900"
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
                  </div>
                )}

                {step === 3 && (
                  <div className="grid gap-4">
                    <Field label="How did you hear about us?">
                      <Select
                        value={form.referral_source}
                        onValueChange={(v) => setField("referral_source", v)}
                      >
                        <SelectTrigger
                          data-testid="form-source"
                          className="h-12 rounded-none border-slate-300 focus:ring-slate-900"
                        >
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          {SOURCES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Anything you'd like us to know?">
                      <Textarea
                        data-testid="form-message"
                        value={form.message}
                        onChange={(e) => setField("message", e.target.value)}
                        placeholder="Optional — questions, preferred batch, etc."
                        rows={4}
                        className="rounded-none border-slate-300 focus-visible:ring-slate-900"
                      />
                    </Field>
                    <div className="text-xs text-slate-500 leading-relaxed">
                      By submitting, you agree to be contacted by Kiki Centre for
                      Technology regarding your admission inquiry. We respect your
                      privacy and will never share your details.
                    </div>
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 1}
                    data-testid="form-back-button"
                    className="inline-flex items-center gap-2 px-5 h-12 border-2 border-slate-300 text-slate-700 font-semibold text-sm disabled:opacity-30 hover:border-slate-900 hover:text-slate-900 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={next}
                      data-testid="form-next-button"
                      className="btn-yellow inline-flex items-center gap-2 px-6 h-12 font-bold uppercase tracking-wider text-sm"
                    >
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={submit}
                      disabled={submitting}
                      data-testid="form-submit-button"
                      className="btn-yellow inline-flex items-center gap-2 px-7 h-12 font-bold uppercase tracking-wider text-sm disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                        </>
                      ) : (
                        <>
                          Submit Application
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children, className = "" }) {
  return (
    <div className={className}>
      <Label className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700">
        {label}
      </Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
