import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";

const Auth = () => {
  const [params] = useSearchParams();
  const initialMode = params.get("mode") === "register" ? "register" : "login";
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => { if (user) navigate("/"); }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = mode === "login"
      ? await signIn(email, password)
      : await signUp(email, password, fullName || email.split("@")[0]);
    setBusy(false);
    if (res.error) {
      toast({ title: mode === "login" ? "Login failed" : "Registration failed", description: res.error, variant: "destructive" });
      return;
    }
    if (mode === "register") {
      toast({ title: "Welcome to JobSphere", description: "Please check your email to confirm your account, then log in." });
      setMode("login");
    } else {
      toast({ title: "Welcome back!" });
      navigate("/");
    }
  };

  return (
    <PageLayout>
      <section className="py-12 md:py-20 min-h-[calc(100vh-200px)] flex items-center">
        <div className="container mx-auto px-4 md:px-8 max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-3xl border border-border p-8 shadow-elevated">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold font-display text-foreground">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
              <p className="text-sm text-muted-foreground mt-2">
                {mode === "login" ? "Sign in to save jobs, get alerts and post openings." : "Free forever. No credit card required."}
              </p>
            </div>

            <form onSubmit={submit} className="space-y-3">
              {mode === "register" && (
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Full name</label>
                  <div className="relative">
                    <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Doe" className="w-full pl-9 pr-4 py-3 rounded-xl bg-secondary border border-border text-sm outline-none focus:border-primary" />
                  </div>
                </div>
              )}
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-9 pr-4 py-3 rounded-xl bg-secondary border border-border text-sm outline-none focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className="w-full pl-9 pr-4 py-3 rounded-xl bg-secondary border border-border text-sm outline-none focus:border-primary" />
                </div>
              </div>

              <button type="submit" disabled={busy} className="w-full gradient-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 disabled:opacity-60">
                {busy && <Loader2 size={16} className="animate-spin" />}
                {mode === "login" ? "Sign in" : "Create account"}
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {mode === "login" ? "New to JobSphere? " : "Already have an account? "}
              <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-primary font-semibold hover:underline">
                {mode === "login" ? "Create an account" : "Sign in"}
              </button>
            </p>
            <p className="text-center text-xs text-muted-foreground mt-4">
              <Link to="/" className="hover:underline">← Back to home</Link>
            </p>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Auth;
