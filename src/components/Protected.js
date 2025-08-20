import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
export default function Protected() {
    const { loading, user } = useAuth();
    if (loading)
        return _jsx("div", { style: { padding: 24 }, children: "Loading\u2026" });
    if (!user)
        return _jsx(Navigate, { to: "/login", replace: true });
    return _jsx(Outlet, {});
}
