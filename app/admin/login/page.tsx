"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (password === "AVISON2026") {
      localStorage.setItem("admin-auth", "true");
      router.push("/admin/orders");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="border border-white/20 rounded-3xl p-10 w-[400px]">
        <h1 className="text-white text-4xl font-black mb-6">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
          w-full
          h-12
          px-4
          bg-zinc-900
          border
          border-white/20
          rounded-xl
          text-white
          mb-4
          "
        />

        <button
          onClick={handleLogin}
          className="
          w-full
          py-3
          bg-white
          text-black
          rounded-xl
          font-bold
          "
        >
          Login
        </button>
      </div>
    </main>
  );
}