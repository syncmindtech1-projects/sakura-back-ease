import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Bell, CheckCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Notif {
  id: string;
  title: string;
  body: string | null;
  link: string | null;
  read: boolean;
  created_at: string;
  type: string;
}

const Notifications = () => {
  const { user, loading } = useAuth();
  const [items, setItems] = useState<Notif[]>([]);
  const [busy, setBusy] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    if (!loading && !user) nav("/auth");
  }, [user, loading, nav]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    const load = async () => {
      setBusy(true);
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (!cancelled) { setItems((data ?? []) as Notif[]); setBusy(false); }
    };
    load();

    const channel = supabase
      .channel("notifications-page")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        (payload) => setItems((prev) => [payload.new as Notif, ...prev]))
      .subscribe();

    return () => { cancelled = true; supabase.removeChannel(channel); };
  }, [user]);

  const markAllRead = async () => {
    if (!user) return;
    await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <PageLayout>
      <section className="py-8 md:py-12 min-h-[60vh]">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground flex items-center gap-2"><Bell size={22} /> Notifications</h1>
              <p className="text-sm text-muted-foreground">Latest jobs and updates for you.</p>
            </div>
            {items.some((n) => !n.read) && (
              <button onClick={markAllRead} className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline">
                <CheckCheck size={14} /> Mark all read
              </button>
            )}
          </div>

          {busy ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin text-muted-foreground" /></div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <Bell size={40} className="mx-auto mb-3 text-primary" />
              <p className="text-foreground font-semibold">No notifications yet</p>
              <p className="text-sm text-muted-foreground mt-1">You'll be notified when new jobs are posted.</p>
              <Link to="/jobs" className="mt-4 inline-block text-primary font-semibold text-sm hover:underline">Browse jobs →</Link>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((n, i) => (
                <motion.div key={n.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                  className={`p-4 rounded-xl border ${n.read ? "bg-card border-border" : "bg-primary/5 border-primary/30"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{n.title}</p>
                      {n.body && <p className="text-xs text-muted-foreground mt-1">{n.body}</p>}
                      <p className="text-[10px] text-muted-foreground mt-2">{new Date(n.created_at).toLocaleString()}</p>
                    </div>
                    {n.link && (
                      <Link to={n.link} className="text-xs font-semibold text-primary hover:underline shrink-0">View →</Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Notifications;
