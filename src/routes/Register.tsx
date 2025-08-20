import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMsg(null);
    const res = await signUp(email.trim(), password);
    setBusy(false);
    if (res.error) setError(res.error);
    else if (res.needsEmailConfirm) setMsg("สมัครสำเร็จ กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ");
    else setMsg("สมัครสำเร็จ เข้าสู่ระบบแล้ว");
  }

  return (
    <div style={{ maxWidth: 420, margin: "56px auto", padding: 24, border: "1px solid #eee", borderRadius: 12 }}>
      <h1 style={{ marginBottom: 12 }}>สมัครสมาชิก</h1>
      <form onSubmit={onSubmit}>
        <label>อีเมล</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@example.com" style={{ width: "100%", padding: 10, margin: "6px 0 12px" }} />
        <label>รหัสผ่าน</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="อย่างน้อย 6 ตัวอักษร" style={{ width: "100%", padding: 10, margin: "6px 0 12px" }} />
        {error && <div style={{ color: "crimson", marginBottom: 8 }}>{error}</div>}
        {msg && <div style={{ color: "seagreen", marginBottom: 8 }}>{msg}</div>}
        <button disabled={busy} type="submit" style={{ width: "100%", padding: 12, borderRadius: 8 }}>
          {busy ? "กำลังสมัคร…" : "สร้างบัญชี"}
        </button>
      </form>
      <div style={{ marginTop: 12 }}>
        มีบัญชีแล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
      </div>
    </div>
  );
}