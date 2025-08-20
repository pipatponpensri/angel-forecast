import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

/**
 * หน้าสมัครสมาชิก
 */
export default function RegisterPage() {
  const { signUp } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState<boolean>(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);

    try {
      const res: any = await signUp(email.trim(), password);

      if (res?.error) {
        setMsg(res.error.message ?? "สมัครสมาชิกไม่สำเร็จ");
        return;
      }

      // เผื่อบางระบบต้องยืนยันอีเมล
      if (res?.needsEmailConfirm) {
        setMsg("สมัครสำเร็จ กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ");
      } else {
        setMsg("สมัครสำเร็จ! เข้าสู่ระบบได้เลย");
      }
    } catch (err: any) {
      setMsg(err?.message ?? "เกิดข้อผิดพลาดในการสมัครสมาชิก");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "56px auto", padding: 24 }}>
      <h1 style={{ marginBottom: 12 }}>สมัครสมาชิก</h1>

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

        {msg && (
          <div
            style={{
              color: msg.includes("สำเร็จ") ? "#16a34a" : "#e11d48",
              marginTop: 8,
            }}
          >
            {msg}
          </div>
        )}

        <button type="submit" disabled={busy} style={buttonStyle}>
          {busy ? "กำลังสมัคร..." : "สมัครสมาชิก"}
        </button>
      </form>

      <div style={{ marginTop: 12, textAlign: "center" }}>
        มีบัญชีอยู่แล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
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
  userSelect: "none",
};
