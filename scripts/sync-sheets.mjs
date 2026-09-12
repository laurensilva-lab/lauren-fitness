// ============================================================
// SCRIPT: sync-sheets.mjs
// Lee la Google Sheet del coach y actualiza workoutData.js
// Se ejecuta automáticamente via GitHub Actions.
// ============================================================
import fs   from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SHEET_ID = process.env.SHEET_ID;
if (!SHEET_ID) { console.error("❌ Falta SHEET_ID"); process.exit(1); }

// ── Leer una hoja via API pública de Google Sheets ──────────
async function readSheet(sheetName) {
  const encoded = encodeURIComponent(sheetName);
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encoded}`;
  const res  = await fetch(url);
  const text = await res.text();
  // Google devuelve JSON envuelto en /*O_o*/google.visualization.Query.setResponse(...)
  const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/)[1]);
  return json.table;
}

// ── Extraer ejercicios de una tabla ─────────────────────────
function parseEjercicios(table) {
  const ejercicios = [];
  if (!table?.rows) return ejercicios;

  for (const row of table.rows) {
    const cells = row.c || [];
    const get   = (i) => cells[i]?.v ?? "";

    const nombre = String(get(0)).trim();
    if (!nombre || nombre.toLowerCase().includes("ejercicio") || nombre.toLowerCase().includes("nombre")) continue;
    if (nombre.toLowerCase() === "dia" || nombre === "") continue;

    const series = String(get(1)).trim();
    const reps   = String(get(2)).trim();
    const rir    = String(get(3)).trim();
    const kg     = String(get(4)).trim();

    // Buscar videoId si hay URL en la celda (columna 5 o 6)
    let videoId = "";
    for (let i = 5; i < Math.min(cells.length, 10); i++) {
      const val = String(get(i));
      const match = val.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (match) { videoId = match[1]; break; }
    }

    if (nombre.length > 2 && series && reps) {
      ejercicios.push({ nombre, series, reps, rir: rir||"--", kg: kg||"-", videoId });
    }
  }
  return ejercicios;
}

// ── Main ─────────────────────────────────────────────────────
console.log("📊 Leyendo Google Sheet...");

// Leer las hojas de meses
const mesesData = [];
for (let i = 1; i <= 5; i++) {
  try {
    const sheetName = i === 1 ? "MES 1" : i === 2 ? "MES 2" : i === 3 ? "mes 3" : i === 4 ? "mes 4" : "mes 5";
    const table = await readSheet(sheetName);

    // Intentar parsear días agrupados
    // La estructura del xlsx tiene grupos de ejercicios por día
    const ejerciciosPorDia = { 1:[], 2:[], 3:[], 4:[] };
    let diaActual = 1;

    for (const row of (table?.rows || [])) {
      const cells = row.c || [];
      const primera = String(cells[0]?.v ?? "").trim().toLowerCase();

      // Detectar cambio de día
      if (primera.includes("dia") || primera.includes("día") || /^d[ií]a\s*\d/.test(primera)) {
        const num = primera.match(/\d+/);
        if (num) diaActual = parseInt(num[0]);
        continue;
      }

      const nombre = String(cells[0]?.v ?? "").trim();
      if (!nombre || nombre.length < 3) continue;

      const series = String(cells[1]?.v ?? "").trim();
      const reps   = String(cells[2]?.v ?? "").trim();
      const rir    = String(cells[3]?.v ?? "").trim();
      const kg     = String(cells[4]?.v ?? "").trim();

      // Buscar videoId
      let videoId = "";
      for (let j = 5; j < cells.length; j++) {
        const val = String(cells[j]?.v ?? "");
        const m = val.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (m) { videoId = m[1]; break; }
        // Hipervínculos en celdas
        const link = cells[j]?.p?.link;
        if (link) {
          const ml = link.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
          if (ml) { videoId = ml[1]; break; }
        }
      }

      if (series && reps && ejerciciosPorDia[diaActual]) {
        ejerciciosPorDia[diaActual].push({ nombre, series, reps, rir: rir||"--", kg: kg||"-", videoId });
      }
    }

    const dias = [1,2,3,4].map(d => ({ dia:d, tipo:"FULL BODY", ejercicios: ejerciciosPorDia[d] }))
                           .filter(d => d.ejercicios.length > 0);

    mesesData.push({ mes: i, nombre: `MES ${i}`, objetivo:"Fuerza + Hipertrofia", duracion:"4 semanas", inicio:"-", dias });
    console.log(`  ✅ MES ${i}: ${dias.reduce((acc,d)=>acc+d.ejercicios.length,0)} ejercicios`);
  } catch(e) {
    console.log(`  ⚠️  MES ${i}: ${e.message}`);
  }
}

if (mesesData.length === 0) {
  console.error("❌ No se pudieron leer los meses. Verificá que la Sheet sea pública.");
  process.exit(1);
}

// ── Leer workoutData.js actual y preservar lo que no cambia ──
const dataPath = path.join(__dirname, "../src/data/workoutData.js");
let current = fs.readFileSync(dataPath, "utf-8");

// Preservar los videoIds actuales para ejercicios ya mapeados
const videoMap = {};
const vidMatches = [...current.matchAll(/nombre:\s*"([^"]+)"[^}]{0,400}?videoId:\s*"([a-zA-Z0-9_-]{11})"/gs)];
for (const [, nombre, vid] of vidMatches) videoMap[nombre] = vid;

// Aplicar videoIds preservados
for (const mes of mesesData) {
  for (const dia of mes.dias) {
    for (const ej of dia.ejercicios) {
      if (!ej.videoId && videoMap[ej.nombre]) ej.videoId = videoMap[ej.nombre];
    }
  }
}

// ── Generar nuevo bloque de meses ─────────────────────────────
const mesesStr = mesesData.reverse().map(mes => { // más reciente primero
  const diasStr = mes.dias.map(dia => {
    const ejsStr = dia.ejercicios.map(ej =>
      `          { nombre: "${ej.nombre}", series: "${ej.series}", reps: "${ej.reps}", rir: "${ej.rir}", kg: "${ej.kg}", videoId: "${ej.videoId}" }`
    ).join(",\n");
    return `      {\n        dia: ${dia.dia},\n        tipo: "${dia.tipo}",\n        ejercicios: [\n${ejsStr}\n        ],\n      }`;
  }).join(",\n");
  return `  {\n    mes: ${mes.mes},\n    nombre: "${mes.nombre}",\n    objetivo: "${mes.objetivo}",\n    duracion: "${mes.duracion}",\n    inicio: "${mes.inicio}",\n    dias: [\n${diasStr}\n    ],\n  }`;
}).join(",\n");

// Reemplazar bloque meses en el archivo
const newContent = current.replace(
  /export const meses = \[[\s\S]*?\];/,
  `export const meses = [\n${mesesStr}\n];`
);

fs.writeFileSync(dataPath, newContent);
console.log(`\n✅ workoutData.js actualizado con ${mesesData.length} meses`);
console.log("📦 Hacé commit para deployar a Vercel.");
