import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export function AdminOnly() {
  const { loading, profile } = useAuth();
  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (profile?.role !== "admin") return <Navigate to="/" replace />;
  return <Outlet />;
}