import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAccess } from "@/lib/accessGate";

export default function RequireApproved({ children }: { children: JSX.Element }) {
  const [state, setState] = useState<"loading" | "ok" | "blocked">("loading");
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    (async () => {
      const res = await checkAccess();
      if (res.ok) {
        setState("ok");
      } else {
        setReason(res.reason);
        setState("blocked");
      }
    })();
  }, []);

  if (state === "loading") return <div className="p-6">Checking access…</div>;

  if (state === "blocked") {
    // ส่งไปหน้าแจ้งเตือนของเรา เช่น /pending หรือ /expired
    const to = reason === "EXPIRED" ? "/expired" : "/pending";
    return <Navigate to={to} replace />;
  }

  return children;
}
