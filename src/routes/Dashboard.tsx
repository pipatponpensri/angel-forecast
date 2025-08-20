import { useAuth } from "../providers/AuthProvider";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { user, profile, signOut } = useAuth();
  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 24 }}>
      <h1>Dashboard</h1>
      <p>ยินดีต้อนรับ: <b>{user?.email}</b></p>
      <p>Role: <b>{profile?.role ?? "-"}</b></p>
      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <Link to="/admin">ไปหน้า Admin</Link>
        <button onClick={() => signOut()}>ออกจากระบบ</button>
      </div>
    </div>
  );
}