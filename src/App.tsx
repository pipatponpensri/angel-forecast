import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireApproved from "./routes/RequireApproved";
import Home from "./pages/Home";
import Pending from "./pages/Pending";
import Expired from "./pages/Expired";
import Login from "./routes/Login";
import Admin from "./routes/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/expired" element={<Expired />} />
        <Route
          path="/"
          element={
            <RequireApproved>
              <Home />
            </RequireApproved>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
