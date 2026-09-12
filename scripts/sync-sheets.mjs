// ============================================================
// SCRIPT: sync-sheets.mjs
// Lee la Google Sheet del coach y actualiza workoutData.js
// Se ejecuta automáticamente via GitHub Actions.
// Sheet ID: 1ObHB-rhdWsHmbFdkpa1mzHwD3oU8cd_6jBfBKOz_VR4
// ============================================================
import fs   from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHEET_ID  = process.env.SHEET_ID || "1ObHB-rhdWsHmbFdkpa1mzHwD3oU8cd_6jBfBKOz_VR4";

// Hojas de meses exactamente como están en el xlsx/Sheet
const HOJAS_MESES = [
  { mes: 5, hoja: "mes 5" },
  { mes: 4, hoja: "mes 4" },
  { mes: 3, hoja: "mes 3" },
  { mes: 2, hoja: "MES 2" },
  { mes: 1, hoja: "MES 1" },
];

// ── Leer hoja via API pública de Google Sheets ───────────────
async function readSheet(sheetName) {
  const encoded = encodeURIComponent(sheetName);
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encoded}`;
  const res  = await fetch(url);
  const text = await res.text();

  if (!text.includes("setResponse")) {
    throw new Error(`Sheet "${sheetName}" no accesible — ¿está la hoja pública?`);
  }

  const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/);
  if (!match) throw new Error("Formato inesperado en la respuesta de Google Sheets");

  return JSON.parse(match[1]).table;
}

// ── Parsear ejercicios de una tabla ─────────────────────────
function parseEjercicios(table) {
  const DIAS = { 1:[], 2:[], 3:[], 4:[] };
  let diaActual = 1;

  for (const row of (table?.rows || [])) {
    const cells  = row.c || [];
    const get    = i => String(cells[i]?.v ?? "").trim();
    const nombre = get(0);

    // Detectar cambio de día: "DIA 1", "Día 2", etc.
    if (/^d[ií]a\s*\d/i.test(nombre)) {
      const num = nombre.match(/\d+/);
      if (num) diaActual = Math.min(4, Math.max(1, parseInt(num[0])));
      continue;
    }

    // Saltear encabezados y celdas vacías
    if (!nombre || nombre.length < 3) continue;
    if (/^(ejercicio|nombre|series|reps|rir|kg|video|dia|día)/i.test(nombre)) continue;

    const series = get(1);
    const reps   = get(2);
    const rir    = get(3) || "--";
    const kg     = get(4) || "-";

    // Buscar videoId en columnas siguientes (puede ser URL o texto)
    let videoId = "";
    for (let j = 5; j < Math.min(cells.length, 12); j++) {
      const val  = get(j);
      const link = cells[j]?.p?.link || "";
      for (const src of [val, link]) {
        const m = src.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (m) { videoId = m[1]; break; }
      }
      if (videoId) break;
    }

    if (series && reps && DIAS[diaActual]) {
      DIAS[diaActual].push({ nombre, series, reps, rir, kg, videoId });
    }
  }

  return DIAS;
}

// ── Preservar videoIds existentes ───────────────────────────
function loadExistingVideoIds(content) {
  const map = {};
  for (const [, nombre, vid] of content.matchAll(
    /nombre:\s*"([^"]+)"[^}]{0,400}?videoId:\s*"([a-zA-Z0-9_-]{11})"/gs
  )) {
    map[nombre.toLowerCase()] = vid;
  }
  return map;
}

function applyVideoIds(dias, videoMap) {
  for (const dia of Object.values(dias)) {
    for (const ej of dia) {
      if (!ej.videoId) {
        ej.videoId = videoMap[ej.nombre.toLowerCase()] || "";
      }
    }
  }
}

// ── Serializar a JS ──────────────────────────────────────────
function serializeMes(mesNum, hoja, dias, metaMeses) {
  const meta = metaMeses[mesNum] || {};
  const diasArr = [1,2,3,4]
    .filter(d => dias[d]?.length > 0)
    .map(d => {
      const ejsStr = dias[d].map(ej =>
        `          { nombre: "${ej.nombre}", series: "${ej.series}", reps: "${ej.reps}", rir: "${ej.rir}", kg: "${ej.kg}", videoId: "${ej.videoId}" }`
      ).join(",\n");
      return `      {\n        dia: ${d},\n        tipo: "FULL BODY",\n        ejercicios: [\n${ejsStr}\n        ],\n      }`;
    }).join(",\n");

  return `  {\n    mes: ${mesNum},\n    nombre: "MES ${mesNum}",\n    objetivo: "${meta.objetivo || "Fuerza + Hipertrofia"}",\n    duracion: "${meta.duracion || "4 semanas"}",\n    inicio: "${meta.inicio || "-"}",\n    dias: [\n${diasArr}\n    ],\n  }`;
}

// ── Extraer meta de meses del contenido actual ───────────────
function extractMetaMeses(content) {
  const meta = {};
  for (const [, mes, obj, dur, ini] of content.matchAll(
    /mes:\s*(\d+),[\s\S]{0,200}?objetivo:\s*"([^"]*)"[\s\S]{0,100}?duracion:\s*"([^"]*)"[\s\S]{0,100}?inicio:\s*"([^"]*)"/g
  )) {
    meta[parseInt(mes)] = { objetivo: obj, duracion: dur, inicio: ini };
  }
  return meta;
}

// ── Main ─────────────────────────────────────────────────────
console.log(`\n📊 Leyendo Google Sheet: ${SHEET_ID}\n`);

const dataPath   = path.join(__dirname, "../src/data/workoutData.js");
const content    = fs.readFileSync(dataPath, "utf-8");
const videoMap   = loadExistingVideoIds(content);
const metaMeses  = extractMetaMeses(content);

const mesesBlocks = [];

for (const { mes, hoja } of HOJAS_MESES) {
  process.stdout.write(`  MES ${mes} (hoja: "${hoja}")...`);
  try {
    const table = await readSheet(hoja);
    const dias  = parseEjercicios(table);
    applyVideoIds(dias, videoMap);

    const total = Object.values(dias).reduce((a, d) => a + d.length, 0);
    console.log(` ✅  ${total} ejercicios`);

    mesesBlocks.push(serializeMes(mes, hoja, dias, metaMeses));
  } catch (e) {
    console.log(` ⚠️  ${e.message} — conservando datos actuales`);
    // Preservar el bloque actual del mes
    const match = content.match(new RegExp(`\\{\\s*\\n\\s*mes:\\s*${mes},[\\s\\S]*?\\n  \\}`));
    if (match) mesesBlocks.push(match[0]);
  }
}

if (mesesBlocks.length === 0) {
  console.error("\n❌ No se pudo leer ningún mes.");
  process.exit(1);
}

const newMeses = `export const meses = [\n${mesesBlocks.join(",\n")}\n];`;
const newContent = content.replace(/export const meses = \[[\s\S]*?\];/, newMeses);

fs.writeFileSync(dataPath, newContent);
console.log(`\n✅ workoutData.js actualizado — ${mesesBlocks.length} meses sincronizados`);
