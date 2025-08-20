import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function RegisterPage() {
  const { signUp } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<boolean>(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setBusy(true);
    setError(null);
    setMsg(null);

    try {
      const res = await signUp(email.trim(), password);
      setBusy(false);

      if ((res as any)?.error) {
        setError((res as any).error as string);
        return;
      }

      // บางระบบอาจต้องยืนยันอีเมลก่อน
      if ((res as any)?.needsEmailConfirm) {
        setMsg("สมัครสำเร็จ กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ");
      } else {
        setMsg("สมัครสำเร็จ เข้าสู่ระบบแล้ว");
      }
    } catch (err: unknown) {
      setBusy(false);
      const m =
        (err as any)?.message ??
        (typeof err === "string" ? err : "เกิดข้อผิดพลาดไม่ทราบสาเหตุ");
      setError(m);
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: "56px auto", padding: 24 }}>
      <h1 style={{ marginBottom: 12 }}>สมัครสมาชิก</h1>

      <form onSubmit={onSubmit}>
        <label>อีเมล</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          type="email"
          required
          style={{ width: "100%", padding: 10, margin: "6px 0 14px" }}
        />

        <label>รหัสผ่าน</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="อย่างน้อย 8 ตัวอักษร"
          type="password"
          required
          style={{ width: "100%", padding: 10, margin: "6px 0 14px" }}
        />

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#991b1b",
              padding: "10px 12px",
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            {error}
          </div>
        )}

        {msg && (
          <div
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "10px 12px",
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            {msg}
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            background: busy ? "#94a3b8" : "#2563eb",
            color: "white",
            border: "none",
            cursor: busy ? "not-allowed" : "pointer",
          }}
        >
          {busy ? "กำลังสมัคร..." : "สมัครสมาชิก"}
        </button>
      </form>

      <div style={{ marginTop: 12, textAlign: "center" }}>
        มีบัญชีแล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
      </div>
    </div>
  );
}
