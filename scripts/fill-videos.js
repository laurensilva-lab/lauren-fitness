// ============================================================
// SCRIPT: fill-videos.js
// Busca videos de YouTube SIN API KEY usando scraping del
// endpoint de búsqueda público de YouTube.
// 
// USO: node scripts/fill-videos.js
// No necesita ninguna cuenta ni tarjeta de crédito.
// ============================================================

import fs   from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Helper: hacer GET con redirect ───────────────────────────
function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      "Accept-Language": "es-ES,es;q=0.9",
    }}, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return get(res.headers.location).then(resolve).catch(reject);
      }
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve(data));
      res.on("error", reject);
    }).on("error", reject);
  });
}

// ── Buscar video en YouTube (sin API) ────────────────────────
async function searchYouTube(query) {
  const encoded = encodeURIComponent(query);
  const url = `https://www.youtube.com/results?search_query=${encoded}&sp=EgIQAQ%253D%253D`; // filtro: videos cortos

  try {
    const html = await get(url);

    // YouTube embeds los resultados en un objeto JS — extraer videoId
    const match = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
    if (match) return match[1];

    // Fallback: buscar en ytInitialData
    const match2 = html.match(/watch\?v=([a-zA-Z0-9_-]{11})/);
    if (match2) return match2[1];

    return null;
  } catch {
    return null;
  }
}

// ── Lista de ejercicios con queries optimizadas ───────────────
const EJERCICIOS = [
  { nombre: "90-90 Cadera",                        query: "ejercicio 90 90 cadera movilidad como hacer" },
  { nombre: "Bicho muerto a un pie",                query: "dead bug bicho muerto un pie tutorial español" },
  { nombre: "Movilidad cadera + dorsal",            query: "movilidad cadera dorsal ejercicio tutorial" },
  { nombre: "Dorsiflexión de tobillo",              query: "dorsiflexion tobillo movilidad ejercicio tutorial" },
  { nombre: "Bisagra de cadera c/bastón",           query: "bisagra cadera baston hip hinge tutorial español" },
  { nombre: "Face Pull",                            query: "face pull polea como hacer tutorial" },
  { nombre: 'Plancha "Toco adelante"',              query: "plancha toque adelante core tutorial" },
  { nombre: "Caminata c/manos",                     query: "inchworm caminata con manos ejercicio tutorial" },
  { nombre: "Sentadilla barra alta",                query: "sentadilla barra alta tecnica tutorial español" },
  { nombre: "Sentadilla Smith",                     query: "sentadilla en smith como hacer tutorial" },
  { nombre: "Sentadilla Smith (tronco vertical)",   query: "sentadilla smith tronco vertical tutorial" },
  { nombre: "Sentadilla c/pausa",                   query: "sentadilla con pausa tutorial tecnica" },
  { nombre: "Peso muerto convencional",             query: "peso muerto convencional tecnica tutorial español" },
  { nombre: "Peso muerto rumano c/m",               query: "peso muerto rumano mancuernas tutorial" },
  { nombre: "Rumano c/barra",                       query: "peso muerto rumano barra como hacer tutorial" },
  { nombre: "Peso muerto 1 pie c/m",                query: "peso muerto una pierna mancuernas tutorial" },
  { nombre: "Hip Thrust c/maquina",                 query: "hip thrust maquina glúteo como hacer" },
  { nombre: "Hip Thrust c/barra",                   query: "hip thrust barra tutorial glúteo" },
  { nombre: "Camilla cuadriceps",                   query: "extension cuadriceps maquina tutorial como hacer" },
  { nombre: "Camilla cuadriceps 1 pie",             query: "extension cuadriceps una pierna maquina tutorial" },
  { nombre: "Camilla de femorales",                 query: "curl femoral maquina acostado tutorial" },
  { nombre: "Curl isquios 1-1/4",                   query: "curl femoral tecnica 1 y cuarto tutorial" },
  { nombre: "Prensa tempo 5\"",                     query: "prensa piernas tempo lento 5 segundos tutorial" },
  { nombre: "Prensa",                               query: "prensa de piernas maquina como hacer tutorial" },
  { nombre: "Búlgaras",                             query: "sentadilla bulgara tutorial como hacer" },
  { nombre: "Búlgara c/pausa 1\"",                  query: "sentadilla bulgara pausa tutorial" },
  { nombre: "Estocadas",                            query: "estocadas lunges como hacer tutorial español" },
  { nombre: "Patada gluteo c/polea",                query: "patada gluteo polea cable como hacer" },
  { nombre: "Patada de gluteo c/polea c/banco inclinado", query: "patada gluteo cable banco inclinado tutorial" },
  { nombre: "Aductores en maquina",                 query: "aductores maquina interior muslo tutorial" },
  { nombre: "Abducción c/banda acostada",           query: "abduccion gluteo banda acostada tutorial" },
  { nombre: "Puente de gluteo unipodal",            query: "puente gluteo una pierna tutorial" },
  { nombre: "Elevaciones de pierna",                query: "elevaciones de pierna abdominales tutorial" },
  { nombre: "Elevaciones de pierna y cadera",       query: "elevaciones pierna cadera colgado tutorial" },
  { nombre: "Jalón al pecho (supino)",              query: "jalon pecho agarre supino polea tutorial" },
  { nombre: "Jalón unilateral (sentado)",           query: "jalon unilateral sentado cable espalda tutorial" },
  { nombre: "Jalón unilateral (arrodillado)",       query: "jalon unilateral arrodillado cable tutorial" },
  { nombre: "Remo c/TRX",                           query: "remo trx suspension espalda como hacer" },
  { nombre: "Remo c/polea prono",                   query: "remo polea agarre prono espalda tutorial" },
  { nombre: "Remo c/polea (neutro)",                query: "remo sentado polea neutro tutorial" },
  { nombre: "Remo c/barra (prono)",                 query: "remo barra inclinado prono espalda tutorial" },
  { nombre: "Serrucho",                             query: "remo serrucho mancuerna unilateral tutorial" },
  { nombre: "Rack Chins 1",                         query: "rack chins australian pull up tutorial" },
  { nombre: "Rack Chins 2",                         query: "rack chins variante dominadas tutorial" },
  { nombre: "Press banca c/pausa",                  query: "press banca con pausa tecnica tutorial" },
  { nombre: "Press inclinado c/m",                  query: "press inclinado mancuernas pecho tutorial" },
  { nombre: "Press c/m sentado",                    query: "press militar mancuernas sentado tutorial" },
  { nombre: "Press c/m sentado 1/4",                query: "press hombro mancuernas cuarto rango tutorial" },
  { nombre: "Press con maquina",                    query: "press hombro maquina como hacer tutorial" },
  { nombre: "Press vertical c/mancuernas",          query: "press vertical mancuernas hombro tutorial" },
  { nombre: "Press katana",                         query: "press katana triceps polea tutorial como hacer" },
  { nombre: "Lagartijas",                           query: "lagartijas push ups tecnica correcta tutorial" },
  { nombre: "Vuelos laterales c/m",                 query: "vuelos laterales mancuernas hombro tutorial" },
  { nombre: "Vuelos laterales tempo",               query: "vuelos laterales tempo lento hombro tutorial" },
  { nombre: "Tras nuca c/m",                        query: "extension triceps trasnuca mancuerna tutorial" },
  { nombre: "Trasnuca c/cuerda",                    query: "extension triceps cuerda polea tutorial" },
  { nombre: "Plancha frontal fitball",               query: "plancha fitball pelota suiza tutorial core" },
  { nombre: "Plancha Copenhague",                   query: "plancha copenhague aductores tutorial como hacer" },
  { nombre: "Crunch",                               query: "crunch abdominal tecnica correcta tutorial" },
  { nombre: "Crunch c/brazos extendidos",           query: "crunch brazos extendidos abdominal tutorial" },
  { nombre: "Crunch c/polea",                       query: "crunch polea alta cable abdomen tutorial" },
  { nombre: "Banco abdominal",                      query: "crunch banco declinado abdominal como hacer" },
  { nombre: "Rueda abdominal fitball",              query: "rollout fitball rueda abdominal tutorial" },
  { nombre: "Rueda abdominal",                      query: "rueda abdominal ab wheel tutorial" },
  { nombre: "Rueda c/fit",                          query: "rueda abdominal fitball rollout tutorial" },
  { nombre: "Twist",                                query: "twist rotacion rusa abdominales tutorial" },
  { nombre: "Bicho muerto a 2 pies",                query: "dead bug bicho muerto dos pies tutorial" },
  { nombre: "Press Pallof",                         query: "press pallof cable core antirotacion tutorial" },
];

// ── Main ──────────────────────────────────────────────────────
const dataPath   = path.join(__dirname, "../src/data/workoutData.js");
let   content    = fs.readFileSync(dataPath, "utf-8");
const backupPath = dataPath + ".backup";
fs.writeFileSync(backupPath, content);
console.log(`✅ Backup guardado\n`);

let found = 0, skipped = 0, errors = 0;
const processed = new Set();

for (const { nombre, query } of EJERCICIOS) {
  if (processed.has(nombre)) continue;
  processed.add(nombre);

  // Solo reemplazar videoId vacíos ("")
  const escaped = nombre.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `(nombre:\\s*["']${escaped}["'][\\s\\S]{0,200}?videoId:\\s*)["']["']`,
    "m"
  );

  if (!pattern.test(content)) {
    skipped++;
    continue;
  }

  process.stdout.write(`🔍 ${nombre.padEnd(45)} `);

  try {
    const videoId = await searchYouTube(query);
    if (videoId) {
      content = content.replace(pattern, `$1"${videoId}"`);
      console.log(`✅ youtu.be/${videoId}`);
      found++;
    } else {
      console.log(`⚠️  sin resultado`);
      skipped++;
    }
  } catch (e) {
    console.log(`❌ ${e.message}`);
    errors++;
  }

  // Delay para no ser bloqueado por YouTube
  await new Promise(r => setTimeout(r, 800));
}

fs.writeFileSync(dataPath, content);
console.log(`
══════════════════════════════════════
✅  Videos agregados: ${found}
⚠️   Sin resultado:   ${skipped}
❌  Errores:          ${errors}
══════════════════════════════════════
Ahora corré:
  git add src/data/workoutData.js
  git commit -m "feat: videos de YouTube agregados"
  git push
`);
