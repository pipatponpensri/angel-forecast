import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAccess } from "../lib/accessGate";

export default function RequireApproved({ children }: { children: JSX.Element }) {
  const [state, setState] = useState<"loading" | "ok" | "blocked">("loading");
  const [reason, setReason] =
    useState<"PENDING" | "EXPIRED" | "NO_SESSION" | "ERROR" | "NO_ROW" | "">("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await checkAccess();
        if (!alive) return;
        if (res.ok) setState("ok");
        else { setReason(res.reason ?? "ERROR"); setState("blocked"); }
      } catch {
        if (!alive) return;
        setReason("ERROR"); setState("blocked");
      }
    })();
    return () => { alive = false; };
  }, []);

  if (state === "loading") return <div className="p-6">Checking access…</div>;
  if (state === "blocked") {
    const to =
      reason === "NO_SESSION" ? "/login" :
      reason === "EXPIRED"    ? "/expired" : "/pending";
    return <Navigate to={to} replace />;
  }
  return children;
}
