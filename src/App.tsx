import Home from "./pages/Home";
import Pending from "./pages/Pending";
import Expired from "./pages/Expired";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/expired" element={<Expired />} />
      </Routes>
    </BrowserRouter>
  );
}
