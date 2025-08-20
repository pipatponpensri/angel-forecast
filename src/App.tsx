// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RequireApproved from "./routes/RequireApproved";
import Diag from "./routes/Diag";

import Home from "./pages/Home";
import Pending from "./pages/Pending";
import Expired from "./pages/Expired";

import Login from "./routes/Login";
import Admin from "./routes/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/expired" element={<Expired />} />

        {/* admin tool */}
        <Route path="/admin" element={<Admin />} />

        {/* diagnostics (ไม่ผ่าน gate) */}
        <Route path="/__diag" element={<Diag />} />

        {/* protected app */}
        <Route
          path="/"
          element={
            <RequireApproved>
              <Home />
            </RequireApproved>
          }
        />

        {/* (ถ้าอยาก) จัดการเส้นทางอื่น ๆ ที่ไม่รู้จัก */}
        {/* <Route path="*" element={<Pending />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
