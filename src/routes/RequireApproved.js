import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAccess } from "../lib/accessGate"; // ใช้ path แบบ relative
export default function RequireApproved({ children }) {
    const [state, setState] = useState("loading");
    const [reason, setReason] = useState("");
    useEffect(() => {
        (async () => {
            const res = await checkAccess();
            if (res.ok)
                setState("ok");
            else {
                setReason(res.reason ?? "ERROR");
                setState("blocked");
            }
        })();
    }, []);
    if (state === "loading")
        return _jsx("div", { className: "p-6", children: "Checking access\u2026" });
    if (state === "blocked")
        return _jsx(Navigate, { to: reason === "EXPIRED" ? "/expired" : "/pending", replace: true });
    return children;
}
