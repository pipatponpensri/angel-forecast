import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
/** หน้าเข้าสู่ระบบ */
export default function LoginPage() {
    const nav = useNavigate();
    const { signIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [busy, setBusy] = useState(false);
    async function onSubmit(e) {
        e.preventDefault();
        setBusy(true);
        setError(null);
        try {
            const res = await signIn(email.trim(), password);
            if (res?.error) {
                setError(res.error.message ?? "เข้าสู่ระบบไม่สำเร็จ");
                return;
            }
            nav("/");
        }
        catch (err) {
            setError(err?.message ?? "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
        }
        finally {
            setBusy(false);
        }
    }
    return (_jsxs("div", { style: { maxWidth: 420, margin: "56px auto", padding: 24 }, children: [_jsx("h1", { style: { marginBottom: 12 }, children: "\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A" }), _jsxs("form", { onSubmit: onSubmit, children: [_jsx("label", { htmlFor: "email", children: "\u0E2D\u0E35\u0E40\u0E21\u0E25" }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, style: inputStyle }), _jsx("label", { htmlFor: "password", style: { marginTop: 8 }, children: "\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19" }), _jsx("input", { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, style: inputStyle }), error && _jsx("div", { style: { color: "#e11d48", marginTop: 8 }, children: error }), _jsx("button", { type: "submit", disabled: busy, style: buttonStyle, children: busy ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ" })] }), _jsxs("div", { style: { marginTop: 12, textAlign: "center" }, children: ["\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E1A\u0E31\u0E0D\u0E0A\u0E35? ", _jsx(Link, { to: "/register", children: "\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01" })] })] }));
}
const inputStyle = {
    display: "block",
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    marginTop: 4,
};
const buttonStyle = {
    width: "100%",
    marginTop: 12,
    padding: "10px 12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
};
