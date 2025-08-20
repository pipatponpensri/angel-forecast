import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function LoginPage() {
  const nav = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await signIn(email.trim(), password);
    setBusy(false);
    if (res.error) setError(res.error);
    else nav("/");
  }

  return (
    <div style={{ maxWidth: 420, margin: "56px auto", padding: 24, border: "1px solid #eee", borderRadius: 12 }}>
      <h1 style={{ marginBottom: 12 }}>เข้าสู่ระบบ</h1>
      <form onSubmit={onSubmit}>
        <label>อีเมล</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@example.com" style={{ width: "100%", padding: 10, margin: "6px 0 12px" }} />
        <label>รหัสผ่าน</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="••••••••" style={{ width: "100%", padding: 10, margin: "6px 0 12px" }} />
        {error && <div style={{ color: "crimson", marginBottom: 8 }}>{error}</div>}
        <button disabled={busy} type="submit" style={{ width: "100%", padding: 12, borderRadius: 8 }}>
          {busy ? "กำลังเข้าสู่ระบบ…" : "เข้าสู่ระบบ"}
        </button>
      </form>
      <div style={{ marginTop: 12 }}>
        ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link>
      </div>
    </div>
  );
}