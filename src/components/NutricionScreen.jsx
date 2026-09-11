// ============================================================
// NutricionScreen — Guía de nutrición + Control de peso/medidas
// Contenido extraído directamente del xlsx del coach
// ============================================================
import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

// ── Íconos ──────────────────────────────────────────────────
const IconChevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition:"transform 300ms cubic-bezier(0.34,1.56,0.64,1)",
             transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// ── Datos de nutrición del xlsx ──────────────────────────────
const SECCIONES = [
  {
    titulo: "1. Déficit calórico",
    subtitulo: "La clave para bajar de peso",
    items: [
      "Para perder grasa, debés consumir menos calorías de las que gastás.",
      "Esto se llama déficit calórico y es la única forma efectiva de perder peso.",
      "Tip: Si no ves cambios en 2-3 semanas, reducí ligeramente las porciones (100-200 kcal menos al día).",
    ],
  },
  {
    titulo: "2. Macronutrientes",
    subtitulo: "Qué priorizar",
    items: [
      "🥩 Proteínas: Mantienen la masa muscular mientras perdés grasa. Meta: 2g por kg de peso. Ejemplos: pollo, carne, huevos, pescado, yogur, legumbres.",
      "🍚 Carbohidratos: Dan energía. Priorizalos cerca del entrenamiento. Ejemplos: arroz, avena, pan integral, papas, frutas.",
      "🥑 Grasas saludables: Necesarias para el metabolismo y las hormonas. Ejemplos: aguacate, frutos secos, aceite de oliva. Controlá las porciones, pero no las eliminés.",
    ],
  },
  {
    titulo: "3. Armado del plato",
    subtitulo: "Método del plato equilibrado",
    items: [
      "½ del plato → verduras (fibra, saciedad)",
      "¼ del plato → proteína (pollo, carne, huevos, tofu)",
      "¼ del plato → carbohidratos (arroz, pan integral, papa)",
      "+ 1 cucharada de grasas saludables (aceite de oliva, frutos secos)",
    ],
  },
  {
    titulo: "4. Hidratación",
    subtitulo: "2-3 litros diarios",
    items: [
      "El agua ayuda a la digestión, controla el hambre y mejora el rendimiento.",
      "Bebé 2-3 litros al día, más si sudás mucho durante el entrenamiento.",
    ],
  },
  {
    titulo: "5. Frecuencia de comidas",
    subtitulo: "Sin mitos",
    items: [
      "No es necesario comer cada 2-3 horas. Elegí un número que puedas mantener.",
      "3-5 comidas al día funcionan bien, dependiendo de tu hambre y horarios.",
      "Evitá los ayunos prolongados si te hacen comer en exceso más tarde.",
    ],
  },
  {
    titulo: "6. Suplementos",
    subtitulo: "Opcionales, no obligatorios",
    items: [
      "Proteína en polvo (whey): si no llegás a tu meta de proteína con comida.",
      "Cafeína: puede ayudarte a mejorar la energía antes de entrenar.",
      "Multivitamínico: útil si tenés deficiencias en tu dieta.",
      "Siempre priorizá la comida real sobre los suplementos.",
    ],
  },
  {
    titulo: "7. Tips para mantener el déficit",
    subtitulo: "Sin sufrir",
    items: [
      "Comé más proteína y fibra: te harán sentir más lleno.",
      "Usá platos más pequeños: truco visual para controlar porciones.",
      "Evitá líquidos con calorías: cambiá jugos por agua o café/té sin azúcar.",
      "No eliminés comidas favoritas: solo reducí la cantidad.",
      "Dormí bien: la falta de sueño aumenta el hambre y la ansiedad por comida.",
    ],
  },
  {
    titulo: "8. Mitos",
    subtitulo: "Falsas creencias",
    items: [
      "❌ 'Comer después de las 6pm engorda' — Lo importante es el total de calorías del día.",
      "❌ 'Saltarse comidas acelera la pérdida' — Puede hacer que comás más luego.",
      "❌ 'Las grasas engordan' — El problema es el exceso de calorías.",
      "❌ 'El cardio es obligatorio' — Ayuda, pero no es la única forma.",
    ],
  },
];

const ALIMENTOS = [
  { cat: "Proteínas", icon: "🥩", ej: "Pechuga de pollo, carne magra, pescado, huevos, yogur griego, tofu, legumbres." },
  { cat: "Carbohidratos", icon: "🍚", ej: "Avena, arroz integral, pan integral, quinoa, papas, frutas." },
  { cat: "Grasas saludables", icon: "🥑", ej: "Aguacate, almendras, nueces, aceite de oliva, yema de huevo." },
  { cat: "Verduras", icon: "🥦", ej: "Espinaca, brócoli, zanahoria, lechuga, pepino, tomate, calabacín." },
];

const MESES_CONTROL = ["MES 1", "MES 2", "MES 3", "MES 4", "MES 5"];

// ── Componente principal ─────────────────────────────────────
export default function NutricionScreen() {
  const [tab, setTab] = useState("nutricion"); // "nutricion" | "medidas"
  const [openSec, setOpenSec] = useState(null);
  const [mesActivo, setMesActivo] = useState(0);

  // Registros de medidas guardados en localStorage
  const [registros, setRegistros] = useLocalStorage("lauren_medidas", {});

  const updateRegistro = (key, field, value) => {
    setRegistros(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: value }
    }));
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>

      {/* Tabs principales */}
      <div style={{ display:"flex", gap:"6px" }}>
        {[
          { id:"nutricion", label:"🥗 Nutrición" },
          { id:"medidas",   label:"📏 Mis Medidas" },
        ].map(({ id, label }) => {
          const active = tab === id;
          return (
            <button key={id} onClick={() => setTab(id)} style={{
              flex:1, padding:"10px 8px", borderRadius:"10px",
              cursor:"pointer", fontFamily:"inherit", fontSize:"13px", fontWeight:"700",
              background: active ? "linear-gradient(160deg,#fff 0%,#c8c8c8 100%)" : "linear-gradient(160deg,#1c1c1c 0%,#111 100%)",
              borderTop:    active ? "1px solid rgba(255,255,255,0.95)" : "1px solid rgba(255,255,255,0.08)",
              borderLeft:   active ? "1px solid rgba(255,255,255,0.5)"  : "1px solid rgba(255,255,255,0.04)",
              borderRight:  active ? "1px solid rgba(0,0,0,0.1)"        : "1px solid rgba(0,0,0,0.4)",
              borderBottom: active ? "1px solid rgba(0,0,0,0.15)"       : "1px solid rgba(0,0,0,0.55)",
              boxShadow: active
                ? "inset 0 1px 0 rgba(255,255,255,0.9), 3px 6px 20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.1)"
                : "inset 0 1px 0 rgba(255,255,255,0.06), 2px 4px 10px rgba(0,0,0,0.5)",
              color: active ? "#000" : "#444",
              transition:"all 280ms cubic-bezier(0.34,1.56,0.64,1)",
            }}>{label}</button>
          );
        })}
      </div>

      {/* ── TAB NUTRICIÓN ── */}
      {tab === "nutricion" && (
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }} className="anim-fade-up">

          {/* Imagen del coach */}
          <div style={{
            borderRadius:"14px", overflow:"hidden",
            borderTop:"1px solid rgba(255,255,255,0.12)", borderLeft:"1px solid rgba(255,255,255,0.06)",
            borderRight:"1px solid rgba(0,0,0,0.4)", borderBottom:"1px solid rgba(0,0,0,0.6)",
            boxShadow:"inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.7)",
          }}>
            <img src="/img/nutricion_0.png" alt="Guía de nutrición"
              style={{ display:"block", width:"100%", objectFit:"cover" }}
              onError={e => e.target.style.display = "none"}
            />
          </div>

          {/* Introducción */}
          <div style={card}>
            <p style={{ fontSize:"13px", color:"#888", lineHeight:1.7 }}>
              Guía práctica de nutrición para pérdida de peso. Diseñada para explicar conceptos de manera sencilla y brindar herramientas prácticas para aplicar fácilmente en el día a día.
            </p>
          </div>

          {/* Secciones desplegables */}
          {SECCIONES.map((sec, i) => {
            const open = openSec === i;
            return (
              <div key={i} style={{
                borderRadius:"12px", overflow:"hidden",
                background: open ? "linear-gradient(145deg,#1a1a1a 0%,#0f0f0f 100%)" : "linear-gradient(145deg,#141414 0%,#0c0c0c 100%)",
                borderTop:    open ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.08)",
                borderLeft:   open ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(255,255,255,0.04)",
                borderRight:  open ? "1px solid rgba(0,0,0,0.55)"       : "1px solid rgba(0,0,0,0.4)",
                borderBottom: open ? "1px solid rgba(0,0,0,0.7)"        : "1px solid rgba(0,0,0,0.55)",
                boxShadow: open
                  ? "inset 0 1px 0 rgba(255,255,255,0.1), 4px 8px 24px rgba(0,0,0,0.7)"
                  : "inset 0 1px 0 rgba(255,255,255,0.05), 2px 4px 10px rgba(0,0,0,0.5)",
                transition:"all 280ms cubic-bezier(0.16,1,0.3,1)",
              }}>
                <button onClick={() => setOpenSec(open ? null : i)} style={{
                  display:"flex", alignItems:"center", gap:"10px", width:"100%",
                  padding:"13px 14px", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", textAlign:"left",
                }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:"13px", fontWeight:"700", color:"#d0d0d0" }}>{sec.titulo}</div>
                    <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"#333", marginTop:"2px" }}>{sec.subtitulo}</div>
                  </div>
                  <IconChevron open={open} />
                </button>
                {open && (
                  <div style={{ padding:"0 14px 14px", borderTop:"1px solid rgba(255,255,255,0.04)" }} className="anim-expand">
                    {sec.items.map((item, j) => (
                      <div key={j} style={{ display:"flex", gap:"8px", padding:"7px 0", borderBottom:"1px solid rgba(255,255,255,0.03)" }}>
                        <span style={{ color:"#333", flexShrink:0, marginTop:"3px", fontFamily:"var(--font-mono)", fontSize:"11px" }}>—</span>
                        <span style={{ fontSize:"13px", color:"#888", lineHeight:1.6 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Tabla de alimentos */}
          <div style={card}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", fontWeight:"700", color:"#333", letterSpacing:"0.12em", marginBottom:"12px" }}>
              ALIMENTOS CLAVE
            </div>
            {ALIMENTOS.map(({ cat, icon, ej }) => (
              <div key={cat} style={{ paddingBottom:"10px", marginBottom:"10px", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ fontSize:"13px", fontWeight:"700", color:"#c0c0c0", marginBottom:"4px" }}>
                  {icon} {cat}
                </div>
                <div style={{ fontSize:"12px", color:"#555", lineHeight:1.5 }}>{ej}</div>
              </div>
            ))}
          </div>

          {/* Conclusión */}
          <div style={{ ...card, borderTop:"1px solid rgba(255,255,255,0.12)" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", fontWeight:"700", color:"#555", letterSpacing:"0.12em", marginBottom:"8px" }}>
              📌 CONCLUSIÓN DEL COACH
            </div>
            <p style={{ fontSize:"12px", color:"#666", lineHeight:1.7, fontStyle:"italic" }}>
              No se trata de hacer una dieta extrema, sino de crear hábitos sostenibles que puedas mantener a largo plazo. La clave es el déficit calórico, la paciencia y la constancia. Para mejores resultados lo ideal es trabajar con un nutricionista.
            </p>
          </div>
        </div>
      )}

      {/* ── TAB MEDIDAS ── */}
      {tab === "medidas" && (
        <div style={{ display:"flex", flexDirection:"column", gap:"14px" }} className="anim-fade-up">

          {/* Instrucciones */}
          <div style={card}>
            <p style={{ fontSize:"13px", color:"#666", lineHeight:1.7 }}>
              Anotá tu peso y medidas semanalmente. Tomá el peso a la mañana en ayuno. Las medidas ayudan a ver progreso aunque la balanza no se mueva.
            </p>
          </div>

          {/* Imagen de cómo tomar medidas */}
          <div style={{
            borderRadius:"14px", overflow:"hidden",
            borderTop:"1px solid rgba(255,255,255,0.1)", borderLeft:"1px solid rgba(255,255,255,0.05)",
            borderRight:"1px solid rgba(0,0,0,0.4)", borderBottom:"1px solid rgba(0,0,0,0.55)",
            boxShadow:"inset 0 1px 0 rgba(255,255,255,0.06), 0 6px 24px rgba(0,0,0,0.6)",
          }}>
            <img src="/img/medidas_2.png" alt="Cómo tomar medidas"
              style={{ display:"block", width:"100%", objectFit:"cover" }}
              onError={e => e.target.style.display="none"}
            />
          </div>

          {/* Selector de mes */}
          <div style={{ display:"flex", gap:"5px", overflowX:"auto", scrollbarWidth:"none" }}>
            {MESES_CONTROL.map((mes, i) => {
              const active = mesActivo === i;
              return (
                <button key={i} onClick={() => setMesActivo(i)} style={{
                  flexShrink:0, padding:"7px 14px", borderRadius:"9px", cursor:"pointer", fontFamily:"var(--font-mono)",
                  fontSize:"11px", fontWeight:"700",
                  background: active ? "linear-gradient(160deg,#fff 0%,#c8c8c8 100%)" : "linear-gradient(160deg,#1c1c1c 0%,#111 100%)",
                  borderTop:    active ? "1px solid rgba(255,255,255,0.95)" : "1px solid rgba(255,255,255,0.08)",
                  borderLeft:   active ? "1px solid rgba(255,255,255,0.5)"  : "1px solid rgba(255,255,255,0.04)",
                  borderRight:  active ? "1px solid rgba(0,0,0,0.1)"        : "1px solid rgba(0,0,0,0.4)",
                  borderBottom: active ? "1px solid rgba(0,0,0,0.15)"       : "1px solid rgba(0,0,0,0.55)",
                  boxShadow: active
                    ? "inset 0 1px 0 rgba(255,255,255,0.9), 0 0 16px rgba(255,255,255,0.1), 3px 5px 14px rgba(0,0,0,0.5)"
                    : "inset 0 1px 0 rgba(255,255,255,0.05), 2px 4px 8px rgba(0,0,0,0.4)",
                  color: active ? "#000" : "#444",
                  transition:"all 260ms cubic-bezier(0.34,1.56,0.64,1)",
                }}>{mes}</button>
              );
            })}
          </div>

          {/* 4 semanas */}
          {[1,2,3,4].map(semana => {
            const key = `m${mesActivo+1}_s${semana}`;
            const r = registros[key] || {};
            return (
              <div key={semana} style={{
                borderRadius:"12px", padding:"14px",
                background:"linear-gradient(145deg,#141414 0%,#0c0c0c 100%)",
                borderTop:"1px solid rgba(255,255,255,0.1)", borderLeft:"1px solid rgba(255,255,255,0.05)",
                borderRight:"1px solid rgba(0,0,0,0.4)", borderBottom:"1px solid rgba(0,0,0,0.55)",
                boxShadow:"inset 0 1px 0 rgba(255,255,255,0.06), 2px 4px 12px rgba(0,0,0,0.5)",
              }}>
                {/* Header semana */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px" }}>
                  <div style={{
                    padding:"3px 10px", borderRadius:"6px",
                    background:"linear-gradient(145deg,#fff 0%,#ccc 100%)",
                    borderTop:"1px solid rgba(255,255,255,0.9)",
                    boxShadow:"inset 0 1px 0 rgba(255,255,255,0.8), 1px 2px 6px rgba(0,0,0,0.4)",
                  }}>
                    <span style={{ fontFamily:"var(--font-mono)", fontSize:"11px", fontWeight:"800", color:"#000" }}>
                      SEMANA {semana}
                    </span>
                  </div>
                  <MedidaInput
                    label="FECHA" value={r.fecha || ""}
                    onChange={v => updateRegistro(key, "fecha", v)}
                    placeholder="dd/mm"
                    width="70px"
                  />
                </div>

                {/* Campos */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
                  <MedidaField label="⚖️ PESO (kg)"     value={r.peso || ""}    onChange={v => updateRegistro(key, "peso", v)}    placeholder="ej: 65.5" />
                  <MedidaField label="📏 CINTURA (cm)"  value={r.cintura || ""} onChange={v => updateRegistro(key, "cintura", v)} placeholder="ej: 72" />
                  <MedidaField label="🦵 MUSLOS (cm)"   value={r.muslos || ""}  onChange={v => updateRegistro(key, "muslos", v)}  placeholder="ej: 55" />
                  <MedidaField label="💪 BRAZO (cm)"    value={r.brazo || ""}   onChange={v => updateRegistro(key, "brazo", v)}   placeholder="ej: 30" />
                  <MedidaField label="😴 SUEÑO (hs)"    value={r.sueno || ""}   onChange={v => updateRegistro(key, "sueno", v)}   placeholder="ej: 8" />
                  <MedidaField label="😤 ESTRÉS (1-10)" value={r.estres || ""}  onChange={v => updateRegistro(key, "estres", v)}  placeholder="ej: 4" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Sub-componentes ──────────────────────────────────────────
function MedidaField({ label, value, onChange, placeholder }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"5px" }}>
      <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", fontWeight:"700", color:"#333", letterSpacing:"0.1em" }}>
        {label}
      </span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width:"100%", padding:"8px 10px", borderRadius:"8px",
          background:"linear-gradient(145deg,#050505 0%,#080808 100%)",
          borderTop:"1px solid rgba(0,0,0,0.6)", borderLeft:"1px solid rgba(0,0,0,0.4)",
          borderRight:"1px solid rgba(255,255,255,0.03)", borderBottom:"1px solid rgba(255,255,255,0.04)",
          boxShadow:"inset 2px 3px 8px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.03)",
          color:"#e0e0e0", fontSize:"14px", fontWeight:"600",
          fontFamily:"var(--font-mono)", outline:"none",
        }}
      />
    </div>
  );
}

function MedidaInput({ label, value, onChange, placeholder, width="80px" }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"3px" }}>
      <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"#333", fontWeight:"700", letterSpacing:"0.08em" }}>{label}</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width, padding:"5px 8px", borderRadius:"7px",
          background:"linear-gradient(145deg,#050505 0%,#080808 100%)",
          borderTop:"1px solid rgba(0,0,0,0.6)", borderLeft:"1px solid rgba(0,0,0,0.4)",
          borderRight:"1px solid rgba(255,255,255,0.03)", borderBottom:"1px solid rgba(255,255,255,0.04)",
          boxShadow:"inset 2px 3px 6px rgba(0,0,0,0.5)",
          color:"#e0e0e0", fontSize:"12px", fontFamily:"var(--font-mono)", outline:"none",
          textAlign:"center",
        }}
      />
    </div>
  );
}

// ── Estilo base de card ──────────────────────────────────────
const card = {
  borderRadius:"12px", padding:"14px",
  background:"linear-gradient(145deg,#141414 0%,#0c0c0c 100%)",
  borderTop:"1px solid rgba(255,255,255,0.08)", borderLeft:"1px solid rgba(255,255,255,0.04)",
  borderRight:"1px solid rgba(0,0,0,0.4)", borderBottom:"1px solid rgba(0,0,0,0.55)",
  boxShadow:"inset 0 1px 0 rgba(255,255,255,0.05), 2px 4px 12px rgba(0,0,0,0.5)",
};
