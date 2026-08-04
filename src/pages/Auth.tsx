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
  const { signIn, signUp, signInWithGoogle, user } = useAuth();
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

  const google = async () => {
    setBusy(true);
    const res = await signInWithGoogle();
    setBusy(false);
    if (res.error) toast({ title: "Google sign-in failed", description: res.error, variant: "destructive" });
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

            <button type="button" onClick={google} disabled={busy} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border bg-card hover:bg-secondary transition-colors font-semibold text-sm disabled:opacity-60">
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 8 3l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 15.1 18.9 12 24 12c3 0 5.8 1.1 8 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.3 35 26.8 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.6 39.7 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.4l6.3 5.3C41 34.9 44 30 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-border" />
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
            <div className="mt-6 pt-4 border-t border-border text-center">
              <Link to="/admin-login" className="text-[11px] uppercase tracking-widest text-muted-foreground hover:text-primary">
                Admin dashboard →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Auth;
