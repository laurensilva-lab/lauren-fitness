import { useState } from "react";

export default function LoginScreen({ onLogin }) {
  const [usuario,  setUsuario]  = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [showPass, setShowPass] = useState(false);

  const SHEET_ID     = "1ObHB-rhdWsHmbFdkpa1mzHwD3oU8cd_6jBfBKOz_VR4";
  const HOJA_ALUMNOS = "ALUMNOS";

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!usuario.trim() || !password.trim()) { setError("Completá usuario y contraseña"); return; }
    setLoading(true); setError("");

    try {
      const url  = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(HOJA_ALUMNOS)}`;
      const res  = await fetch(url);
      const text = await res.text();

      if (!text.includes("setResponse")) throw new Error("No se pudo conectar. Verificá tu conexión.");

      const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/)[1]);
      const rows = json.table?.rows || [];

      // Columnas: A=usuario  B=contraseña  C=nombre  D=sheet_id  E=activo
      let found = null;
      for (const row of rows) {
        const c    = row.c || [];
        const user = String(c[0]?.v ?? "").trim().toLowerCase();
        const pass = String(c[1]?.v ?? "").trim();
        if (user === usuario.trim().toLowerCase() && pass === password.trim()) {
          const activo = String(c[4]?.v ?? "si").trim().toLowerCase();
          if (activo === "no") { setError("Cuenta desactivada. Hablá con el coach."); setLoading(false); return; }
          found = {
            usuario: user,
            nombre:  String(c[2]?.v ?? user).trim(),
            sheetId: String(c[3]?.v ?? SHEET_ID).trim(),
            loginAt: Date.now(),
          };
          break;
        }
      }

      if (!found) { setError("Usuario o contraseña incorrectos"); setLoading(false); return; }

      localStorage.setItem("rse_session", JSON.stringify(found));
      onLogin(found);

    } catch (err) {
      setError(err.message || "Error al conectar. Intentá de nuevo.");
    }
    setLoading(false);
  };

  return (
    <div style={s.wrapper}>
      <div style={s.glow} />

      <div style={s.card} className="anim-fade-up">
        {/* Logo */}
        <div style={s.logoWrap}>
          <img src="/img/rse-logo.jpg" alt="RSE"
            style={s.logo} onError={e => e.target.style.display="none"} />
        </div>

        {/* Título */}
        <div style={{ textAlign:"center" }}>
          <h1 style={s.title}>Bienvenido/a</h1>
          <p style={s.sub}>Ingresá con tus datos del gym</p>
        </div>

        {/* Campos */}
        <div style={s.fields}>
          {/* Usuario */}
          <div style={s.field}>
            <label style={s.label}>USUARIO</label>
            <div style={s.wrap}>
              <svg style={s.icon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              <input style={s.input} type="text" placeholder="tu.usuario"
                value={usuario} onChange={e=>{setUsuario(e.target.value);setError("");}}
                autoCapitalize="none" autoCorrect="off"
                onKeyDown={e=>e.key==="Enter"&&handleLogin(e)}
              />
            </div>
          </div>

          {/* Contraseña */}
          <div style={s.field}>
            <label style={s.label}>CONTRASEÑA</label>
            <div style={s.wrap}>
              <svg style={s.icon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input style={s.input} type={showPass?"text":"password"} placeholder="••••••••"
                value={password} onChange={e=>{setPassword(e.target.value);setError("");}}
                onKeyDown={e=>e.key==="Enter"&&handleLogin(e)}
              />
              <button type="button" style={s.eye} onClick={()=>setShowPass(!showPass)}>
                {showPass
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22"/></svg>
                  : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={s.error} className="anim-fade-up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          {/* Botón */}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{ ...s.btn, ...(loading ? { opacity:0.6, cursor:"not-allowed" } : {}) }}
          >
            {loading ? "Verificando..." : "Ingresar →"}
          </button>
        </div>

        <p style={s.footer}>¿No tenés acceso? Hablá con el coach.</p>
      </div>
    </div>
  );
}

const s = {
  wrapper: {
    minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
    background:"#060606", padding:"24px 16px", position:"relative", overflow:"hidden",
  },
  glow: {
    position:"absolute", inset:0, pointerEvents:"none",
    background:"radial-gradient(ellipse 60% 40% at 30% 20%, rgba(255,255,255,0.04) 0%, transparent 70%)",
  },
  card: {
    position:"relative", zIndex:1, width:"100%", maxWidth:"360px",
    background:"linear-gradient(145deg,#141414 0%,#0c0c0c 100%)",
    borderTop:   "1px solid rgba(255,255,255,0.16)",
    borderLeft:  "1px solid rgba(255,255,255,0.08)",
    borderRight: "1px solid rgba(0,0,0,0.5)",
    borderBottom:"1px solid rgba(0,0,0,0.65)",
    boxShadow:"inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(255,255,255,0.06), 0 0 60px rgba(255,255,255,0.04), 8px 16px 48px rgba(0,0,0,0.8)",
    borderRadius:"18px", padding:"32px 28px",
    display:"flex", flexDirection:"column", gap:"22px",
  },
  logoWrap: { display:"flex", justifyContent:"center" },
  logo: {
    width:"120px", height:"85px", objectFit:"contain", borderRadius:"10px",
    borderTop:"1px solid rgba(255,255,255,0.12)", borderLeft:"1px solid rgba(255,255,255,0.06)",
    borderRight:"1px solid rgba(0,0,0,0.4)", borderBottom:"1px solid rgba(0,0,0,0.5)",
    boxShadow:"inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.05), 3px 6px 20px rgba(0,0,0,0.6)",
  },
  title: { fontSize:"22px", fontWeight:"800", color:"#f0f0f0", letterSpacing:"-0.02em", marginBottom:"4px" },
  sub:   { fontSize:"13px", color:"#444" },
  fields: { display:"flex", flexDirection:"column", gap:"13px" },
  field:  { display:"flex", flexDirection:"column", gap:"6px" },
  label:  { fontFamily:"var(--font-mono)", fontSize:"9px", fontWeight:"700", color:"#2e2e2e", letterSpacing:"0.12em" },
  wrap:   { position:"relative", display:"flex", alignItems:"center" },
  icon:   { position:"absolute", left:"12px", color:"#2e2e2e", pointerEvents:"none" },
  input: {
    width:"100%", padding:"11px 40px 11px 36px", borderRadius:"10px",
    background:"linear-gradient(145deg,#050505 0%,#080808 100%)",
    borderTop:"1px solid rgba(0,0,0,0.6)", borderLeft:"1px solid rgba(0,0,0,0.4)",
    borderRight:"1px solid rgba(255,255,255,0.04)", borderBottom:"1px solid rgba(255,255,255,0.05)",
    boxShadow:"inset 2px 3px 8px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.03)",
    color:"#e0e0e0", fontSize:"14px", fontFamily:"inherit", outline:"none",
  },
  eye: {
    position:"absolute", right:"11px", background:"none", border:"none",
    cursor:"pointer", padding:"4px", display:"flex", alignItems:"center",
  },
  error: {
    display:"flex", alignItems:"center", gap:"7px",
    padding:"9px 12px", borderRadius:"8px",
    background:"linear-gradient(145deg,#1a0808 0%,#110505 100%)",
    borderTop:"1px solid rgba(200,60,60,0.2)", border:"1px solid rgba(200,60,60,0.12)",
    color:"#bb4444", fontSize:"12px",
  },
  btn: {
    width:"100%", padding:"13px", borderRadius:"10px",
    background:"linear-gradient(160deg,#fff 0%,#c8c8c8 100%)",
    borderTop:"1px solid rgba(255,255,255,0.95)", borderLeft:"1px solid rgba(255,255,255,0.5)",
    borderRight:"1px solid rgba(0,0,0,0.1)", borderBottom:"1px solid rgba(0,0,0,0.15)",
    boxShadow:"inset 0 1px 0 rgba(255,255,255,0.9), 3px 6px 20px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.08)",
    color:"#000", fontSize:"14px", fontWeight:"800", cursor:"pointer",
    fontFamily:"inherit", letterSpacing:"0.02em",
    transition:"all 200ms cubic-bezier(0.34,1.56,0.64,1)",
  },
  footer: { textAlign:"center", fontSize:"11px", color:"#252525", lineHeight:1.5 },
};
