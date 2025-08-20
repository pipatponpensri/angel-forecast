import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
export default function DashboardPage() {
    const { user, profile, signOut } = useAuth();
    return (_jsxs("div", { style: { maxWidth: 720, margin: "40px auto", padding: 24 }, children: [_jsx("h1", { children: "Dashboard" }), _jsxs("p", { children: ["\u0E22\u0E34\u0E19\u0E14\u0E35\u0E15\u0E49\u0E2D\u0E19\u0E23\u0E31\u0E1A: ", _jsx("b", { children: user?.email })] }), _jsxs("p", { children: ["Role: ", _jsx("b", { children: profile?.role ?? "-" })] }), _jsxs("div", { style: { display: "flex", gap: 12, marginTop: 12 }, children: [_jsx(Link, { to: "/admin", children: "\u0E44\u0E1B\u0E2B\u0E19\u0E49\u0E32 Admin" }), _jsx("button", { onClick: () => signOut(), children: "\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A" })] })] }));
}
