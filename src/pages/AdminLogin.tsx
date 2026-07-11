import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Loader2, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-ops", {
        body: { username, password, action: "list_ads" },
      });
      if (error || (data as any)?.error) throw new Error((data as any)?.error || error?.message);
      sessionStorage.setItem("jobsphere_admin", JSON.stringify({ username, password }));
      toast({ title: "Welcome back, admin" });
      navigate("/admin");
    } catch (err: any) {
      toast({ title: "Login failed", description: err.message || "Invalid credentials", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-elevated">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mb-3">
            <Shield size={26} />
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Authorised personnel only</p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="text-xs font-semibold mb-1 block">Username</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={username} onChange={(e) => setUsername(e.target.value)} required
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-secondary border border-border text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold mb-1 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-secondary border border-border text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <button type="submit" disabled={busy}
            className="w-full gradient-primary text-primary-foreground font-semibold py-3 rounded-xl inline-flex items-center justify-center gap-2 disabled:opacity-60">
            {busy && <Loader2 size={16} className="animate-spin" />}
            Sign in to dashboard
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          <a href="/" className="hover:underline">← Back to site</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
