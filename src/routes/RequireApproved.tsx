import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAccess } from "../lib/accessGate"; // ใช้ path แบบ relative

export default function RequireApproved({ children }: { children: JSX.Element }) {
  const [state, setState] = useState<"loading" | "ok" | "blocked">("loading");
  const [reason, setReason] =
    useState<"PENDING" | "EXPIRED" | "NO_SESSION" | "ERROR" | "NO_ROW" | "">("");

  useEffect(() => {
    (async () => {
      const res = await checkAccess();
      if (res.ok) setState("ok");
      else {
        setReason(res.reason ?? "ERROR");
        setState("blocked");
      }
    })();
  }, []);

  if (state === "loading") return <div className="p-6">Checking access…</div>;
  if (state === "blocked") return <Navigate to={reason === "EXPIRED" ? "/expired" : "/pending"} replace />;
  return children;
}
