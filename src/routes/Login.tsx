import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function LoginPage() {
  const nav = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<boolean>(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await signIn(email.trim(), password);
      setBusy(false);

      // ถ้า signIn คืน error/message มาก็แสดงไว้
      if ((res as any)?.error || (res as any)?.message) {
        setError(
          (res as any).error ??
            ((res as any).message as string) ??
            "เข้าสู่ระบบไม่สำเร็จ"
        );
        return;
      }

      // สำเร็จ -> กลับไปหน้าแรก
      nav("/");
    } catch (err: unknown) {
      setBusy(false);
      const msg =
        (err as any)?.message ??
        (typeof err === "string" ? err : "เกิดข้อผิดพลาดไม่ทราบสาเหตุ");
      setError(msg);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "56px auto", padding: 24 }}>
      <h1 style={{ marginBottom: 12 }}>เข้าสู่ระบบ</h1>

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
          placeholder="********"
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

        <button
          type="submit"
          disabled={busy}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            background: busy ? "#94a3b8" : "#16a34a",
            color: "white",
            border: "none",
            cursor: busy ? "not-allowed" : "pointer",
          }}
        >
          {busy ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>
      </form>

      <div style={{ marginTop: 12, textAlign: "center" }}>
        ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link>
      </div>
    </div>
  );
}
