import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Sparkles, X, Send, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SUGGESTIONS = [
  "What courses do you offer?",
  "Am I eligible after Class 10?",
  "How does Earn While You Learn work?",
  "Where is the campus?",
];

const genSessionId = () =>
  `kiki-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [sessionId] = useState(() => {
    if (typeof window === "undefined") return genSessionId();
    let id = window.localStorage.getItem("kiki_chat_session");
    if (!id) {
      id = genSessionId();
      window.localStorage.setItem("kiki_chat_session", id);
    }
    return id;
  });
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Kiki AI — your admission assistant. Ask me anything about our 3.5-year German-certified courses, eligibility, stipend, or how to apply.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, [messages, open]);

  const send = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setMessages((p) => [...p, { role: "user", content: msg }]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post(`${API}/ai/chat`, {
        session_id: sessionId,
        message: msg,
      });
      setMessages((p) => [...p, { role: "assistant", content: res.data.reply }]);
    } catch (e) {
      console.error(e);
      setMessages((p) => [
        ...p,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please call +91 8800288994 or message us on WhatsApp — we'll help right away.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        aria-label="Open Kiki AI Assistant"
        data-testid="ai-toggle-button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-40 group"
      >
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-slate-950 text-white grid place-items-center shadow-2xl hover:scale-105 transition-transform">
            <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-400" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-yellow-400 animate-ping" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-yellow-400" />
          </div>
          <div className="hidden sm:block bg-white border border-slate-200 px-3.5 py-2 shadow-md">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Ask Kiki AI
            </div>
            <div className="text-xs font-semibold text-slate-900">
              Instant admission help
            </div>
          </div>
        </div>
      </button>

      {/* Panel */}
      {open && (
        <div
          data-testid="ai-chat-panel"
          className="fixed bottom-4 left-2 right-2 sm:bottom-24 sm:left-6 sm:right-auto sm:w-[380px] z-50 bg-white border border-slate-900 shadow-2xl flex flex-col max-h-[80vh] sm:max-h-[560px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-slate-950 text-white px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 grid place-items-center bg-yellow-400 text-slate-950">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="font-display font-bold text-sm leading-tight">
                  Kiki AI Assistant
                </div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              data-testid="ai-close-button"
              className="h-8 w-8 grid place-items-center hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-slate-950 text-white"
                      : "bg-white border border-slate-200 text-slate-800"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 px-3.5 py-2.5 text-sm text-slate-500 inline-flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Kiki AI is typing…
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t border-slate-200 bg-white">
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-bold mb-1.5">
                Quick questions
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-2.5 py-1.5 border border-slate-300 hover:border-slate-950 hover:bg-yellow-50 text-slate-700 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex border-t border-slate-200 bg-white"
          >
            <input
              type="text"
              value={input}
              data-testid="ai-chat-input"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about courses, fees, eligibility…"
              className="flex-1 px-4 h-12 text-sm outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              data-testid="ai-chat-send"
              className="btn-yellow w-12 h-12 grid place-items-center disabled:opacity-50"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
