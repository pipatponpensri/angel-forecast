import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

/** หน้าเข้าสู่ระบบ */
export default function LoginPage() {
  const nav = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<boolean>(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res: any = await signIn(email.trim(), password);

      if (res?.error) {
        setError(res.error.message ?? "เข้าสู่ระบบไม่สำเร็จ");
        return;
      }
      nav("/");
    } catch (err: any) {
      setError(err?.message ?? "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "56px auto", padding: 24 }}>
      <h1 style={{ marginBottom: 12 }}>เข้าสู่ระบบ</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="email">อีเมล</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <label htmlFor="password" style={{ marginTop: 8 }}>
          รหัสผ่าน
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        {error && <div style={{ color: "#e11d48", marginTop: 8 }}>{error}</div>}

        <button type="submit" disabled={busy} style={buttonStyle}>
          {busy ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>
      </form>

      <div style={{ marginTop: 12, textAlign: "center" }}>
        ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  marginTop: 4,
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 12,
  padding: "10px 12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
};

