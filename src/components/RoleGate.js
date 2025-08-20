import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
export function AdminOnly() {
    const { loading, profile } = useAuth();
    if (loading)
        return _jsx("div", { style: { padding: 24 }, children: "Loading\u2026" });
    if (profile?.role !== "admin")
        return _jsx(Navigate, { to: "/", replace: true });
    return _jsx(Outlet, {});
}
