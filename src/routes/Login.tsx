// src/routes/Login.tsx
import { useState } from "react";
import { supabase } from "../supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("Sending magic link…");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin }, // กลับมาที่โดเมนนี้
    });
    setMsg(error ? `Error: ${error.message}` : "Check your email for the link.");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSignIn} className="space-x-2">
        <input
          type="email"
          required
          value={email}
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="border p-2">Send magic link</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
