"use client";

import { useState } from "react";
import { createIssue } from "@/app/issues/createIssue";
import "../styles/marriott-login.css";

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

    window.location.href = "/reports"; // REDIRECCIÓN
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
        {/* LOGO */}
        <img
          src="/logo.png"
          alt="Vacation Living Logo"
          className="lux-logo"
        />

        <h2 className="lux-title">Vacation Living</h2>
        <p className="lux-subtitle">Inspector Access</p>

        <form onSubmit={handleLogin} className="lux-form">
          {/* EMAIL */}
          <input
            className="lux-input"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD + TOGGLE */}
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

          {/* ERROR */}
          {error && <p className="lux-error">{error}</p>}

          {/* LOGIN BUTTON */}
          <button className="lux-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password */}
        <button className="lux-forgot" onClick={handleReset}>
          Forgot Password?
        </button>
      </div>
    </div>
  );
}
