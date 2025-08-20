import { supabase } from "./supabaseClient";

export type AccessCheck =
  | { ok: true }
  | { ok: false; reason: "PENDING" | "EXPIRED" | "NO_ROW" | "NO_SESSION" | "ERROR"; message?: string };

export async function checkAccess(): Promise<AccessCheck> {
  const { data: { session }, error: sErr } = await supabase.auth.getSession();
  if (sErr) return { ok: false, reason: "ERROR", message: sErr.message };
  if (!session) return { ok: false, reason: "NO_SESSION" };

  const uid = session.user.id;

  const { data, error } = await supabase
    .from("user_access")
    .select("is_approved, expires_at")
    .eq("user_id", uid)
    .single();

  if (error) return { ok: false, reason: "ERROR", message: error.message };
  if (!data) return { ok: false, reason: "NO_ROW" };

  const approved = data.is_approved === true;
  const notExpired = !data.expires_at || new Date(data.expires_at) > new Date();

  if (!approved) return { ok: false, reason: "PENDING" };
  if (!notExpired) return { ok: false, reason: "EXPIRED" };

  return { ok: true };
}
