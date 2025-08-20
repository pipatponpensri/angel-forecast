import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { checkAccess } from "../lib/accessGate";

type Acc = { ok: boolean; reason?: string; message?: string };

export default function Diag() {
  const [session, setSession] = useState<any>(null);
  const [access, setAccess] = useState<Acc | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [uaRow, setUaRow] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const ses = await supabase.auth.getSession();
        setSession(ses.data.session ?? null);

        const acc = await checkAccess().catch((e) => ({ ok:false, reason:"ERROR", message:String(e) }));
        setAccess(acc);

        const uid = ses.data.session?.user?.id;
        if (uid) {
          const adminQ = await supabase.from("admins").select("user_id").eq("user_id", uid).maybeSingle();
          if (!adminQ.error) setIsAdmin(!!adminQ.data);

          const uaQ = await supabase.from("user_access").select("is_approved, expires_at").eq("user_id", uid).maybeSingle();
          if (!uaQ.error) setUaRow(uaQ.data ?? null);
        }
      } catch (e:any) {
        setErr(e.message ?? String(e));
      }
    })();
  }, []);

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-xl font-bold">Diagnostics</h1>
      <div><b>VITE_SUPABASE_URL:</b> {import.meta.env.VITE_SUPABASE_URL}</div>
      <div><b>Session:</b> {session ? "present" : "none"}</div>
      {session && <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify({ user: session.user }, null, 2)}</pre>}
      <div><b>isAdmin:</b> {isAdmin === null ? "checking..." : String(isAdmin)}</div>
      <div><b>user_access row:</b> {uaRow ? "exists" : "none"}</div>
      {uaRow && <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(uaRow, null, 2)}</pre>}
      <div><b>checkAccess():</b></div>
      <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(access, null, 2)}</pre>
      {err && <div className="text-red-600">Error: {err}</div>}
    </div>
  );
}
