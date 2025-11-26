"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "../styles/marriott-login.css";

// Create Supabase client for browser
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid login credentials");
      setLoading(false);
      return;
    }

    // REDIRECT
    window.location.href = "/reports";
  };

  const handleReset = async () => {
    if (!email) {
      setError("Enter your email to reset password");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setError("Error sending reset email");
    } else {
      setError("Password reset email sent ✔");
    }
  };

  return (
    <div className="lux-container">
      <div className="lux-overlay"></div>

      <div className="lux-card">
        <img src="/logo.png" alt="Vacation Living Logo" className="lux-logo" />

        <h2 className="lux-title">Vacation Living</h2>
        <p className="lux-subtitle">Inspector Access</p>

        <form onSubmit={handleLogin} className="lux-form">
          <input
            className="lux-input"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="lux-pass-wrapper">
            <input
              className="lux-input"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="lux-toggle-pass"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>

          {error && <p className="lux-error">{error}</p>}

          <button className="lux-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <button className="lux-forgot" onClick={handleReset}>
          Forgot Password?
        </button>
      </div>
    </div>
  );
}