import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireApproved from "./routes/RequireApproved";
import Home from "./pages/Home";
import Pending from "./pages/Pending";
import Expired from "./pages/Expired";
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/pending", element: _jsx(Pending, {}) }), _jsx(Route, { path: "/expired", element: _jsx(Expired, {}) }), _jsx(Route, { path: "/", element: _jsx(RequireApproved, { children: _jsx(Home, {}) }) })] }) }));
}
