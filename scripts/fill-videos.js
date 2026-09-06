// ============================================================
// SCRIPT: fill-videos.js
// Busca automáticamente videos de YouTube para cada ejercicio
// y actualiza workoutData.js con los videoId encontrados.
//
// USO:
//   1. Conseguí tu API key GRATIS en:
//      https://console.cloud.google.com
//      → Crear proyecto → Habilitar "YouTube Data API v3"
//      → Credenciales → Crear API Key
//      (la cuota gratuita es 10.000 unidades/día, más que suficiente)
//
//   2. Corré en la carpeta del proyecto:
//      node scripts/fill-videos.js TU_API_KEY
//
//   3. Subí los cambios a GitHub:
//      git add src/data/workoutData.js
//      git commit -m "feat: videos agregados automáticamente"
//      git push
// ============================================================

import fs   from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY   = process.argv[2];

if (!API_KEY) {
  console.error("\n❌ Falta la API key.");
  console.error("Uso: node scripts/fill-videos.js TU_API_KEY\n");
  process.exit(1);
}

// ── Ejercicios con queries optimizadas para tutoriales en español ──
const EJERCICIOS = [
  // Calentamiento
  { nombre: "90-90 Cadera",                        query: "estiramiento 90 90 cadera movilidad tutorial" },
  { nombre: "Bicho muerto a un pie",                query: "dead bug un pie ejercicio tutorial" },
  { nombre: "Movilidad cadera + dorsal",            query: "movilidad cadera dorsal ejercicio tutorial" },
  { nombre: "Dorsiflexión de tobillo",              query: "dorsiflexion tobillo ejercicio movilidad" },
  { nombre: "Bisagra de cadera c/bastón",           query: "bisagra de cadera baston hip hinge tutorial" },
  { nombre: "Face Pull",                            query: "face pull polea tutorial hombro" },
  { nombre: 'Plancha "Toco adelante"',              query: "plancha con toque adelante core tutorial" },
  { nombre: "Caminata c/manos",                     query: "inchworm caminata manos ejercicio calentamiento" },
  // Piernas / Glúteo
  { nombre: "Sentadilla barra alta",                query: "sentadilla barra alta tutorial tecnica" },
  { nombre: "Sentadilla Smith",                     query: "sentadilla smith maquina tutorial" },
  { nombre: "Sentadilla Smith (tronco vertical)",   query: "sentadilla smith tronco vertical tutorial" },
  { nombre: "Sentadilla c/pausa",                   query: "sentadilla con pausa tecnica tutorial" },
  { nombre: "Peso muerto convencional",             query: "peso muerto convencional tutorial tecnica" },
  { nombre: "Peso muerto rumano c/m",               query: "peso muerto rumano mancuernas tutorial" },
  { nombre: "Peso muerto rumano c/barra",           query: "peso muerto rumano barra tutorial" },
  { nombre: "Rumano c/barra",                       query: "peso muerto rumano barra tutorial" },
  { nombre: "Peso muerto 1 pie c/m",                query: "peso muerto una pierna mancuernas tutorial" },
  { nombre: "Hip Thrust c/maquina",                 query: "hip thrust maquina tutorial glúteo" },
  { nombre: "Hip Thrust c/barra",                   query: "hip thrust barra tutorial glúteo" },
  { nombre: "Camilla cuadriceps",                   query: "extension cuadriceps maquina tutorial" },
  { nombre: "Camilla cuadriceps 1 pie",             query: "extension cuadriceps una pierna maquina tutorial" },
  { nombre: "Camilla de femorales",                 query: "curl femoral acostado maquina tutorial" },
  { nombre: "Curl isquios 1-1/4",                   query: "curl femoral un cuarto rep tecnica tutorial" },
  { nombre: "Prensa tempo 5\"",                     query: "prensa piernas tempo lento tecnica tutorial" },
  { nombre: "Prensa",                               query: "prensa de piernas maquina tutorial" },
  { nombre: "Búlgaras",                             query: "sentadilla bulgara tutorial español" },
  { nombre: "Búlgara c/pausa 1\"",                  query: "sentadilla bulgara con pausa tutorial" },
  { nombre: "Estocadas",                            query: "estocadas lunges tutorial español" },
  { nombre: "Patada gluteo c/polea",                query: "patada gluteo polea cable tutorial" },
  { nombre: "Patada de gluteo c/polea c/banco inclinado", query: "patada gluteo polea banco inclinado tutorial" },
  { nombre: "Patada gluteo c/polea c/banco inclinado", query: "patada gluteo polea banco inclinado tutorial" },
  { nombre: "Aductores en maquina",                 query: "aductores maquina interior muslo tutorial" },
  { nombre: "Abducción c/banda acostada",           query: "abduccion banda elastica acostada tutorial" },
  { nombre: "Puente de gluteo unipodal",            query: "puente glúteo una pierna tutorial" },
  { nombre: "Elevaciones de pierna",                query: "elevaciones de pierna colgado tutorial" },
  { nombre: "Elevaciones de pierna y cadera",       query: "elevaciones pierna cadera toes to bar tutorial" },
  // Espalda / Tracción
  { nombre: "Jalón al pecho (supino)",              query: "jalon pecho agarre supino tutorial" },
  { nombre: "Jalón unilateral (sentado)",           query: "jalon unilateral sentado cable tutorial" },
  { nombre: "Jalón unilateral (arrodillado)",       query: "jalon unilateral arrodillado cable tutorial" },
  { nombre: "Remo c/TRX",                           query: "remo trx suspension tutorial espalda" },
  { nombre: "Remo c/polea prono",                   query: "remo polea agarre prono tutorial" },
  { nombre: "Remo c/polea (neutro)",                query: "remo polea sentado agarre neutro tutorial" },
  { nombre: "Remo c/barra (prono)",                 query: "remo barra inclinado agarre prono tutorial" },
  { nombre: "Serrucho",                             query: "serrucho mancuerna remo unilateral tutorial" },
  { nombre: "Rack Chins 1",                         query: "rack chins australian pull ups tutorial" },
  { nombre: "Rack Chins 2",                         query: "rack chins variacion espalda tutorial" },
  // Pecho / Press
  { nombre: "Press banca c/pausa",                  query: "press banca con pausa tutorial tecnica" },
  { nombre: "Press inclinado c/m",                  query: "press inclinado mancuernas tutorial" },
  { nombre: "Press c/m sentado",                    query: "press militar mancuernas sentado tutorial" },
  { nombre: "Press c/m sentado 1/4",                query: "press hombro mancuernas cuarto rango tutorial" },
  { nombre: "Press con maquina",                    query: "press hombro maquina tutorial" },
  { nombre: "Press vertical c/mancuernas",          query: "press vertical mancuernas hombro tutorial" },
  { nombre: "Press katana",                         query: "press katana triceps cable tutorial" },
  { nombre: "Lagartijas",                           query: "lagartijas push ups tecnica correcta tutorial" },
  // Hombros / Brazos
  { nombre: "Vuelos laterales c/m",                 query: "vuelos laterales mancuernas hombro tutorial" },
  { nombre: "Vuelos laterales tempo",               query: "vuelos laterales tempo lento hombro tutorial" },
  { nombre: "Tras nuca c/m",                        query: "extension triceps trasnuca mancuerna tutorial" },
  { nombre: "Trasnuca c/cuerda",                    query: "extension triceps cuerda polea tutorial" },
  { nombre: "Trasnuca c/cuerda",                    query: "press frances cuerda polea alta tutorial" },
  // Core / Abdomen
  { nombre: "Plancha frontal fitball",               query: "plancha fitball pelota suiza tutorial" },
  { nombre: "Plancha Copenhague",                   query: "plancha copenhague aductores lateral tutorial" },
  { nombre: "Crunch",                               query: "crunch abdominal tecnica correcta tutorial" },
  { nombre: "Crunch c/brazos extendidos",           query: "crunch brazos extendidos tutorial abdomen" },
  { nombre: "Crunch c/polea",                       query: "crunch polea alta cable tutorial" },
  { nombre: "Banco abdominal",                      query: "crunch banco declinado abdominal tutorial" },
  { nombre: "Rueda abdominal fitball",              query: "rollout fitball pelota rueda abdominal tutorial" },
  { nombre: "Rueda abdominal",                      query: "rueda abdominal ab wheel tutorial" },
  { nombre: "Rueda c/fit",                          query: "rueda abdominal fitball tutorial" },
  { nombre: "Twist",                                query: "twist rotacion rusa abdominales tutorial" },
  { nombre: "Bicho muerto a 2 pies",                query: "dead bug bicho muerto dos pies tutorial" },
  { nombre: "Press Pallof",                         query: "press pallof cable antirotacion core tutorial" },
];

// ── Buscar video en YouTube ───────────────────────────────────
async function searchYouTube(query) {
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part",             "snippet");
  url.searchParams.set("q",               query);
  url.searchParams.set("type",            "video");
  url.searchParams.set("maxResults",      "3");
  url.searchParams.set("key",             API_KEY);
  url.searchParams.set("relevanceLanguage","es");
  url.searchParams.set("videoDuration",   "short");

  const res  = await fetch(url.toString());
  const data = await res.json();

  if (data.error) throw new Error(data.error.message);
  if (!data.items?.length) return null;
  return data.items[0].id.videoId;
}

// ── Main ──────────────────────────────────────────────────────
const dataPath = path.join(__dirname, "../src/data/workoutData.js");
let content    = fs.readFileSync(dataPath, "utf-8");

// Backup antes de modificar
const backupPath = dataPath + ".backup";
fs.writeFileSync(backupPath, content);
console.log(`✅ Backup guardado en: ${backupPath}\n`);

let found = 0, skipped = 0, errors = 0;
const processed = new Set();

for (const { nombre, query } of EJERCICIOS) {
  if (processed.has(nombre)) continue;
  processed.add(nombre);

  // Escapar caracteres especiales para regex
  const escaped = nombre.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Buscar el ejercicio con videoId vacío — patrón flexible
  const pattern = new RegExp(
    `(nombre:\\s*["']${escaped}["'][\\s\\S]*?videoId:\\s*)["']["']`,
    "m"
  );

  if (!pattern.test(content)) {
    console.log(`⏭️  Omitido (no encontrado en datos): ${nombre}`);
    skipped++;
    continue;
  }

  process.stdout.write(`🔍 ${nombre}...`);

  try {
    const videoId = await searchYouTube(query);
    if (videoId) {
      content = content.replace(pattern, `$1"${videoId}"`);
      console.log(` ✅  https://youtu.be/${videoId}`);
      found++;
    } else {
      console.log(" ⚠️  Sin resultado");
      skipped++;
    }
  } catch (err) {
    console.log(` ❌  ${err.message}`);
    errors++;
  }

  // Respetar cuota: 200ms entre llamadas
  await new Promise(r => setTimeout(r, 200));
}

fs.writeFileSync(dataPath, content);

console.log(`
══════════════════════════════════════
✅  Videos encontrados: ${found}
⚠️   Sin resultado:      ${skipped}
❌  Errores:             ${errors}
══════════════════════════════════════
Archivo actualizado: src/data/workoutData.js

Próximos pasos:
  git add src/data/workoutData.js
  git commit -m "feat: videos de YouTube agregados"
  git push
`);
