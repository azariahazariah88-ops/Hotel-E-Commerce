import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./AuthContext";

/**
 * This page handles the redirect from the backend after Google OAuth.
 * URL looks like: /auth/callback?data=<encoded JSON>
 * It extracts the token + user, stores them, then redirects to /profile.
 */
function AuthCallback() {
  const [searchParams] = useSearchParams();
  const { login }      = useAuth();
  const navigate       = useNavigate();
  const [status, setStatus] = useState("Signing you in...");

  useEffect(() => {
    const data = searchParams.get("data");
    const error = searchParams.get("error");

    if (error) {
      setStatus("Google sign-in failed. Redirecting...");
      setTimeout(() => navigate("/profile?error=google_failed"), 1500);
      return;
    }

    if (data) {
      try {
        const { token, user } = JSON.parse(decodeURIComponent(data));
        login(user, token);
        setStatus(`Welcome, ${user.name}! 🎉`);
        setTimeout(() => navigate("/profile"), 900);
      } catch {
        setStatus("Something went wrong. Redirecting...");
        setTimeout(() => navigate("/profile"), 1500);
      }
    } else {
      navigate("/profile");
    }
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0d",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Lora', serif",
      gap: 20,
    }}>
      {/* Spinner */}
      <div style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        border: "3px solid rgba(245,200,66,0.2)",
        borderTopColor: "#f5c842",
        animation: "spin 0.9s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ color: "#f5c842", fontSize: "1.05rem", margin: 0 }}>{status}</p>
    </div>
  );
}

export default AuthCallback;
