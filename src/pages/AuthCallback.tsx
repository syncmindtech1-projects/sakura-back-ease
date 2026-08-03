import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const finish = (session: unknown) => {
      if (cancelled) return;
      const stored = sessionStorage.getItem("postAuthRedirect");
      sessionStorage.removeItem("postAuthRedirect");
      const target = stored && stored.startsWith("/") && !stored.startsWith("//") ? stored : "/";
      navigate(session ? target : "/auth", { replace: true });
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) finish(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) finish(session);
      else {
        // Give the SDK a moment to process the URL fragment / code exchange.
        setTimeout(async () => {
          const { data } = await supabase.auth.getSession();
          if (data.session) finish(data.session);
          else if (!cancelled) {
            setError("We couldn't complete your sign-in. Please try again.");
            setTimeout(() => navigate("/auth", { replace: true }), 1500);
          }
        }, 1200);
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-6 text-sm text-muted-foreground">
          {error ?? "Completing your sign-in…"}
        </p>
      </div>
    </main>
  );
};

export default AuthCallback;
