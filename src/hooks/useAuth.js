import { useState } from "react";

export function useAuth() {
  const [session, setSession] = useState(() => {
    try {
      const stored = localStorage.getItem("rse_session");
      if (!stored) return null;
      const data = JSON.parse(stored);
      const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - data.loginAt > THIRTY_DAYS) {
        localStorage.removeItem("rse_session");
        return null;
      }
      return data;
    } catch { return null; }
  });

  const login  = (alumno) => setSession(alumno);
  const logout = () => { localStorage.removeItem("rse_session"); setSession(null); };

  return { session, login, logout };
}
