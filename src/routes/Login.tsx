import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null); setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) throw error;
      // ล็อกอินสำเร็จ → ไปหน้าแอดมินเลย
      nav("/admin", { replace: true });
    } catch (err: any) {
      setMsg(err.message ?? "เข้าสู่ระบบไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }

  async function onLogout() {
    await supabase.auth.signOut();
    setMsg("ออกจากระบบแล้ว");
  }

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">เข้าสู่ระบบ</h1>
      <form className="space-y-3" onSubmit={onLogin}>
        <input
          type="email"
          required
          placeholder="admin@example.com"
          className="w-full border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="••••••••"
          className="w-full border rounded px-3 py-2"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded px-3 py-2 bg-black text-white disabled:opacity-50"
        >
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>
      </form>

      <button className="mt-3 text-sm underline" onClick={onLogout}>
        ออกจากระบบ
      </button>

      {msg && <p className="text-sm mt-2">{msg}</p>}
    </div>
  );
}
