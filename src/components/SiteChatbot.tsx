import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Show me remote jobs",
  "How do I post a job?",
  "Take me to the salary guide",
  "Help me build a resume",
];

const SiteChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm the JobSphere Assistant. Ask me anything about jobs, resources, or where to go on the site." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("site-chat", {
        body: { messages: next.map(({ role, content }) => ({ role, content })) },
      });
      if (error) throw error;
      const reply = data?.content ?? "Sorry, I couldn't respond just now.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      if (data?.nav && typeof data.nav === "string") {
        setTimeout(() => {
          navigate(data.nav);
          setOpen(false);
        }, 700);
      }
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "I hit a snag. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
        aria-label={open ? "Close assistant" : "Open assistant"}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[min(380px,calc(100vw-2.5rem))] h-[min(560px,calc(100vh-8rem))] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-secondary/40">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Sparkles size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground">JobSphere Assistant</h3>
              <p className="text-[11px] text-muted-foreground">Ask anything · powered by AI</p>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary text-foreground rounded-bl-md"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-muted-foreground rounded-2xl rounded-bl-md px-3.5 py-2.5 text-sm inline-flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" /> Thinking…
                </div>
              </div>
            )}
            {messages.length === 1 && !loading && (
              <div className="pt-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-secondary transition-colors text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border p-3 flex items-center gap-2 bg-background"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about jobs, tools, or navigation…"
              className="flex-1 bg-secondary/60 border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 hover:opacity-90 transition-opacity"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SiteChatbot;
