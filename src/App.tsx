import { Route, Routes, Navigate } from "react-router-dom";
import Protected from "./components/Protected";
import { AdminOnly } from "./components/RoleGate";
import LoginPage from "./routes/Login";
import RegisterPage from "./routes/Register";
import DashboardPage from "./routes/Dashboard";
import AdminPage from "./routes/Admin";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* เส้นทางที่ต้องล็อกอิน */}
      <Route element={<Protected />}>
        <Route index element={<DashboardPage />} />

        {/* เฉพาะแอดมิน */}
        <Route element={<AdminOnly />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}