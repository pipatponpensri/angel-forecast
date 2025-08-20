// src/routes/Diag.tsx
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { checkAccess } from "../lib/accessGate";

export default function Diag() {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [uaRow, setUaRow] = useState<any>(null);
  const [access, setAccess] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session ?? null);

        const acc = await checkAccess();
        setAccess(acc);

        const uid = data.session?.user?.id;
        if (uid) {
          const adminQ = await supabase.from("admins").select("user_id").eq("user_id", uid).maybeSingle();
          if (!adminQ.error) setIsAdmin(!!adminQ.data);

          const uaQ = await supabase.from("user_access").select("is_approved, expires_at").eq("user_id", uid).maybeSingle();
          if (!uaQ.error) setUaRow(uaQ.data ?? null);
        }
      } catch (e: any) {
        setErr(e.message ?? String(e));
      }
    })();
  }, []);

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-xl font-bold">Diagnostics</h1>
      <div><b>Session:</b> {session ? "present" : "none"}</div>
      <div><b>isAdmin:</b> {isAdmin === null ? "checking..." : String(isAdmin)}</div>
      <div><b>user_access row:</b> {uaRow ? "exists" : "none"}</div>
      <div><b>checkAccess():</b></div>
      <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(access, null, 2)}</pre>
      {err && <div className="text-red-600">Error: {err}</div>}
    </div>
  );
}
