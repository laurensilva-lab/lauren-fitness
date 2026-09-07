// ============================================================
// DATOS DE LA RUTINA - Extraídos de LAUREN.xlsx
// Para editar ejercicios, modificar los objetos de cada mes/día
// Para agregar videos, llenar el campo "videoId" con el ID de YouTube
// Ejemplo: si la URL es https://www.youtube.com/watch?v=abc123, el ID es "abc123"
// ============================================================

// ─────────────────────────────────────────────────
// INFORMACIÓN GENERAL DEL PROGRAMA
// ─────────────────────────────────────────────────
export const programInfo = {
  planificacion: "Maxi",
  objetivo: "Fuerza + Hipertrofia",
};

// ─────────────────────────────────────────────────
// CALENTAMIENTO POR DÍA
// Cada día tiene sus propios ejercicios de entrada en calor
// ─────────────────────────────────────────────────
export const warmupData = {
  instrucciones:
    "Después de realizar los ejercicios del calentamiento, realizar las series de aproximación para el primer ejercicio del día. Realizar 1 a 3 series de aproximación.",
  cuandoHacer2o3Series:
    "En sentadilla y peso muerto cuando carga su peso corporal en la barra. Press de banco cuando cargo el 75% de mi peso. Cualquier ejercicio donde tenga que hacer máximo 6 repeticiones pesadas.",
  dias: [
    {
      dia: 1,
      ejercicios: [
        { nombre: "90-90 Cadera", series: 2, reps: "6xL", videoId: "ytFkOm7UBvI" },
        { nombre: "Bicho muerto a un pie", series: 2, reps: "10 total", videoId: "vfxEpH_mITs" },
        { nombre: "Movilidad cadera + dorsal", series: 2, reps: "6xL", videoId: "aZQqVCKhJvY" },
        { nombre: "Dorsiflexión de tobillo", series: 2, reps: "6xL", videoId: "M5GgXC3Ys7A" },
      ],
    },
    {
      dia: 2,
      ejercicios: [
        { nombre: "Bisagra de cadera c/bastón", series: 2, reps: "8", videoId: "5rFCgGPvEQY" },
        { nombre: "Face Pull", series: 2, reps: "10", videoId: "V8dZ3x_pAkA" },
        { nombre: "Bicho muerto a un pie", series: 2, reps: "10 total", videoId: "vfxEpH_mITs" },
      ],
    },
    {
      dia: 3,
      ejercicios: [
        { nombre: "Movilidad cadera + dorsal", series: 2, reps: "6xL", videoId: "aZQqVCKhJvY" },
        { nombre: "Dorsiflexión de tobillo", series: 2, reps: "6xL", videoId: "M5GgXC3Ys7A" },
        { nombre: 'Plancha "Toco adelante"', series: 2, reps: "5xL", videoId: "kT_H5j0fKyY" },
      ],
    },
    {
      dia: 4,
      ejercicios: [
        { nombre: "Bisagra de cadera c/bastón", series: 2, reps: "8", videoId: "5rFCgGPvEQY" },
        { nombre: "Bicho muerto a un pie", series: 2, reps: "10 total", videoId: "vfxEpH_mITs" },
        { nombre: "Caminata c/manos", series: 2, reps: "6", videoId: "FNJhgJTyP1Y" },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────
// MESES DE ENTRENAMIENTO
// Estructura: cada mes tiene días, cada día tiene ejercicios
// Para agregar el video de un ejercicio, llenar "videoId"
// ─────────────────────────────────────────────────
export const meses = [
  // ══════════════════════════════════════
  // MES 1 — Adaptación anatómica y técnica
  // Inicio: Diciembre — Duración: 8 semanas
  // ══════════════════════════════════════
  {
    mes: 1,
    nombre: "MES 1",
    objetivo: "Adaptación anatómica y técnica",
    duracion: "8 semanas",
    inicio: "Diciembre",
    dias: [
      {
        dia: 1,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Sentadilla barra alta", series: "4", reps: "8", rir: "-", kg: "20?", videoId: "Q1EJJlI1_DU" },
          { nombre: "Press banca c/pausa", series: "4", reps: "8", rir: "-", kg: "10 a 20?", videoId: "2uONVXReAYc" },
          { nombre: "Camilla cuadriceps", series: "4", reps: "10", rir: "--", kg: "10l?", videoId: "YyvSfVjQeL0" },
          { nombre: "Press c/m sentado", series: "4", reps: "10", rir: "-", kg: "5 a 8Xl?", videoId: "qEwKCR5JCog" },
          { nombre: "Aductores en maquina", series: "3", reps: "12", rir: "-", kg: "20 a 35?", videoId: "xqMbMqE3Obw" },
          { nombre: "Plancha frontal fitball", series: "3", reps: '20-30"', rir: "-", kg: "-", videoId: "DHjqLTbepEM" },
        ],
      },
      {
        dia: 2,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto convencional", series: "4", reps: "8", rir: "-", kg: "20?", videoId: "kancsOn7CJY" },
          { nombre: "Jalón al pecho (supino)", series: "4", reps: "8", rir: "-", kg: "?", videoId: "cwN6QVwXTgQ" },
          { nombre: "Camilla de femorales", series: "4", reps: "10", rir: "--", kg: "3 a 6L?", videoId: "Orxowest56U" },
          { nombre: "Remo c/TRX", series: "4", reps: "10", rir: "-", kg: "-", videoId: "EUF9VDK-E5U" },
          { nombre: "Patada gluteo c/polea", series: "3", reps: "12", rir: "-", kg: "?", videoId: "VpiZcwGQJM0" },
          { nombre: "Twist", series: "3", reps: "12xL", rir: "-", kg: "5KG?", videoId: "lKGfIlilMwQ" },
        ],
      },
      {
        dia: 3,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Sentadilla Smith (tronco vertical)", series: "4", reps: "8", rir: "-", kg: "10 a 20?", videoId: "u-UGdQ2F9OM" },
          { nombre: "Press inclinado c/m", series: "4", reps: "8", rir: "-", kg: "6 a 8Xl?", videoId: "8iPEnn-ltC8" },
          { nombre: "Estocadas", series: "4", reps: "10", rir: "--", kg: "5 a 10Xl?", videoId: "eRu6mmpofHk" },
          { nombre: "Vuelos laterales c/m", series: "4", reps: "10", rir: "-", kg: "3 a 5Xl?", videoId: "3VcKaXpzqRo" },
          { nombre: "Crunch", series: "3", reps: "12", rir: "-", kg: "5kg?", videoId: "Xyd_fa5zoEU" },
          { nombre: "Tras nuca c/m", series: "3", reps: "12", rir: "-", kg: "5 a 8k?", videoId: "5GDpYpwzlp4" },
        ],
      },
      {
        dia: 4,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto rumano c/m", series: "4", reps: "8", rir: "-", kg: "10 a 20Xl?", videoId: "yoNxIcUYj-U" },
          { nombre: "Remo c/polea prono", series: "4", reps: "8", rir: "-", kg: "?", videoId: "GZbfZ033f74" },
          { nombre: "Hip Thrust c/maquina", series: "4", reps: "10", rir: "--", kg: "20 a 40?", videoId: "3SHkXmrQtxQ" },
          { nombre: "Serrucho", series: "4", reps: "10", rir: "-", kg: "7 a 12?", videoId: "QdlygCkqMkM" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "12", rir: "-", kg: "?", videoId: "4A7Nv_KpEMk" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12", rir: "-", kg: "-", videoId: "JB2oyawG9KI" },
        ],
      },
    ],
  },

  // ══════════════════════════════════════
  // MES 2 — Adaptación anatómica y técnica
  // Inicio: Febrero — Duración: 8 semanas
  // ══════════════════════════════════════
  {
    mes: 2,
    nombre: "MES 2",
    objetivo: "Adaptación anatómica y técnica",
    duracion: "8 semanas",
    inicio: "Febrero",
    dias: [
      {
        dia: 1,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Sentadilla barra alta", series: "4", reps: "8", rir: "-", kg: "20?", videoId: "Q1EJJlI1_DU" },
          { nombre: "Press banca c/pausa", series: "4", reps: "8", rir: "-", kg: "10 a 20?", videoId: "2uONVXReAYc" },
          { nombre: "Camilla cuadriceps", series: "4", reps: "10", rir: "--", kg: "10l?", videoId: "YyvSfVjQeL0" },
          { nombre: "Press c/m sentado", series: "4", reps: "10", rir: "-", kg: "5 a 8Xl?", videoId: "qEwKCR5JCog" },
          { nombre: "Aductores en maquina", series: "3", reps: "12", rir: "-", kg: "20 a 35?", videoId: "xqMbMqE3Obw" },
          { nombre: "Plancha frontal fitball", series: "3", reps: '20-30"', rir: "-", kg: "-", videoId: "DHjqLTbepEM" },
        ],
      },
      {
        dia: 2,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto convencional", series: "4", reps: "8", rir: "-", kg: "20?", videoId: "kancsOn7CJY" },
          { nombre: "Jalón al pecho (supino)", series: "4", reps: "8", rir: "-", kg: "?", videoId: "cwN6QVwXTgQ" },
          { nombre: "Camilla de femorales", series: "4", reps: "10", rir: "--", kg: "3 a 6L?", videoId: "Orxowest56U" },
          { nombre: "Remo c/TRX", series: "4", reps: "10", rir: "-", kg: "-", videoId: "EUF9VDK-E5U" },
          { nombre: "Patada gluteo c/polea", series: "3", reps: "12", rir: "-", kg: "?", videoId: "VpiZcwGQJM0" },
          { nombre: "Twist", series: "3", reps: "12xL", rir: "-", kg: "5KG?", videoId: "lKGfIlilMwQ" },
        ],
      },
      {
        dia: 3,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Sentadilla Smith (tronco vertical)", series: "4", reps: "8", rir: "-", kg: "10 a 20?", videoId: "u-UGdQ2F9OM" },
          { nombre: "Press inclinado c/m", series: "4", reps: "8", rir: "-", kg: "6 a 8Xl?", videoId: "8iPEnn-ltC8" },
          { nombre: "Estocadas", series: "4", reps: "10", rir: "--", kg: "5 a 10Xl?", videoId: "eRu6mmpofHk" },
          { nombre: "Vuelos laterales c/m", series: "4", reps: "10", rir: "-", kg: "3 a 5Xl?", videoId: "3VcKaXpzqRo" },
          { nombre: "Crunch", series: "3", reps: "12", rir: "-", kg: "5kg?", videoId: "Xyd_fa5zoEU" },
          { nombre: "Tras nuca c/m", series: "3", reps: "12", rir: "-", kg: "5 a 8k?", videoId: "5GDpYpwzlp4" },
        ],
      },
      {
        dia: 4,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto rumano c/m", series: "4", reps: "8", rir: "-", kg: "10 a 20Xl?", videoId: "yoNxIcUYj-U" },
          { nombre: "Remo c/polea prono", series: "4", reps: "8", rir: "-", kg: "?", videoId: "GZbfZ033f74" },
          { nombre: "Hip Thrust c/maquina", series: "4", reps: "10", rir: "--", kg: "20 a 40?", videoId: "3SHkXmrQtxQ" },
          { nombre: "Serrucho", series: "4", reps: "10", rir: "-", kg: "7 a 12?", videoId: "QdlygCkqMkM" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "12", rir: "-", kg: "?", videoId: "4A7Nv_KpEMk" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12", rir: "-", kg: "-", videoId: "JB2oyawG9KI" },
        ],
      },
    ],
  },

  // ══════════════════════════════════════
  // MES 3 — Fuerza + Hipertrofia
  // Inicio: Marzo — Duración: 8 semanas
  // ══════════════════════════════════════
  {
    mes: 3,
    nombre: "MES 3",
    objetivo: "Fuerza + Hipertrofia",
    duracion: "8 semanas",
    inicio: "Marzo",
    dias: [
      {
        dia: 1,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Sentadilla Smith", series: "3", reps: "6-8", rir: "1", kg: "20 a 35k?", videoId: "u-UGdQ2F9OM" },
          { nombre: "Press banca c/pausa", series: "3", reps: "6-8", rir: "1", kg: "12 a 24k?", videoId: "2uONVXReAYc" },
          { nombre: "Camilla de femorales", series: "2+AMRAP", reps: "10-12", rir: "1", kg: "3 a 6L?", videoId: "Orxowest56U" },
          { nombre: "Jalón al pecho (supino)", series: "2+AMRAP", reps: "10-12", rir: "1", kg: "5 a 8Xl?", videoId: "cwN6QVwXTgQ" },
          { nombre: "Aductores en maquina", series: "2+AMRAP", reps: "12-15", rir: "1", kg: "20 a 35?", videoId: "xqMbMqE3Obw" },
          { nombre: "Rueda c/fit", series: "3", reps: "12-15", rir: "1", kg: "-", videoId: "ik0tYqfuheg" },
        ],
      },
      {
        dia: 2,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Rumano c/barra", series: "3", reps: "6-8", rir: "1", kg: "20 a 35k?", videoId: "NIng2JWF1Rs" },
          { nombre: "Remo c/polea prono", series: "3", reps: "6-8", rir: "1", kg: "?", videoId: "GZbfZ033f74" },
          { nombre: "Camilla cuadriceps 1 pie", series: "3", reps: "10-12", rir: "1", kg: "9 a 12l?", videoId: "YyvSfVjQeL0" },
          { nombre: "Press c/m sentado 1/4", series: "3", reps: "10-12", rir: "-", kg: "?", videoId: "qEwKCR5JCog" },
          { nombre: "Patada gluteo c/polea", series: "2+AMRAP", reps: "12-15", rir: "1", kg: "?", videoId: "VpiZcwGQJM0" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12-15", rir: "1", kg: "5KG?", videoId: "JB2oyawG9KI" },
        ],
      },
      {
        dia: 3,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Hip Thrust c/barra", series: "3", reps: "6-8", rir: "1", kg: "40 a 60k?", videoId: "HuulIq7y_zI" },
          { nombre: "Rack Chins 1", series: "3", reps: "6-8", rir: "1", kg: "-", videoId: "rloXn5HVaQM" },
          { nombre: "Búlgaras", series: "3", reps: "10-12", rir: "1", kg: "5 a 10Xl?", videoId: "eRu6mmpofHk" },
          { nombre: "Vuelos laterales c/m", series: "2+AMRAP", reps: "10-12", rir: "1", kg: "3 a 5Xl?", videoId: "3VcKaXpzqRo" },
          { nombre: "Banco abdominal", series: "3", reps: "12-15", rir: "1", kg: "5kg?", videoId: "Xyd_fa5zoEU" },
          { nombre: "Trasnuca c/cuerda", series: "3", reps: "12-15", rir: "1", kg: "?", videoId: "U1bnGVP5E_w" },
        ],
      },
      {
        dia: 4,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto rumano c/m", series: "4", reps: "8", rir: "-", kg: "10 a 20Xl?", videoId: "yoNxIcUYj-U" },
          { nombre: "Remo c/polea prono", series: "4", reps: "8", rir: "-", kg: "?", videoId: "GZbfZ033f74" },
          { nombre: "Hip Thrust c/maquina", series: "4", reps: "10", rir: "--", kg: "20 a 40?", videoId: "3SHkXmrQtxQ" },
          { nombre: "Serrucho", series: "4", reps: "10", rir: "-", kg: "7 a 12?", videoId: "QdlygCkqMkM" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "12", rir: "-", kg: "?", videoId: "4A7Nv_KpEMk" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12", rir: "-", kg: "-", videoId: "JB2oyawG9KI" },
        ],
      },
    ],
  },

  // ══════════════════════════════════════
  // MES 4 — Fuerza + Hipertrofia
  // Inicio: Finales de Marzo — Duración: 4 semanas
  // ══════════════════════════════════════
  {
    mes: 4,
    nombre: "MES 4",
    objetivo: "Fuerza + Hipertrofia",
    duracion: "4 semanas",
    inicio: "Finales de Marzo",
    dias: [
      {
        dia: 1,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Sentadilla Smith", series: "3", reps: "6-8", rir: "1", kg: "20 a 35k?", videoId: "u-UGdQ2F9OM" },
          { nombre: "Press banca c/pausa", series: "3", reps: "6-8", rir: "1", kg: "12 a 24k?", videoId: "2uONVXReAYc" },
          { nombre: "Camilla de femorales", series: "3", reps: "10-12", rir: "1", kg: "3 a 6L?", videoId: "Orxowest56U" },
          { nombre: "Jalón al pecho (supino)", series: "3", reps: "10-12", rir: "1", kg: "5 a 8Xl?", videoId: "cwN6QVwXTgQ" },
          { nombre: "Aductores en maquina", series: "3", reps: "12-15", rir: "1", kg: "20 a 35?", videoId: "xqMbMqE3Obw" },
          { nombre: "Rueda c/fit", series: "3", reps: "12-15", rir: "1", kg: "-", videoId: "ik0tYqfuheg" },
        ],
      },
      {
        dia: 2,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Rumano c/barra", series: "3", reps: "6-8", rir: "1", kg: "20 a 35k?", videoId: "NIng2JWF1Rs" },
          { nombre: "Remo c/polea prono", series: "3", reps: "6-8", rir: "1", kg: "?", videoId: "GZbfZ033f74" },
          { nombre: "Camilla cuadriceps 1 pie", series: "3", reps: "10-12", rir: "1", kg: "9 a 12l?", videoId: "YyvSfVjQeL0" },
          { nombre: "Press c/m sentado 1/4", series: "3", reps: "10-12", rir: "-", kg: "?", videoId: "qEwKCR5JCog" },
          { nombre: "Patada gluteo c/polea", series: "3", reps: "12-15", rir: "1", kg: "?", videoId: "VpiZcwGQJM0" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12-15", rir: "1", kg: "5KG?", videoId: "JB2oyawG9KI" },
        ],
      },
      {
        dia: 3,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Hip Thrust c/barra", series: "3", reps: "6-8", rir: "1", kg: "40 a 60k?", videoId: "HuulIq7y_zI" },
          { nombre: "Rack Chins 1", series: "3", reps: "6-8", rir: "1", kg: "-", videoId: "rloXn5HVaQM" },
          { nombre: "Búlgaras", series: "3", reps: "10-12", rir: "1", kg: "5 a 10Xl?", videoId: "eRu6mmpofHk" },
          { nombre: "Vuelos laterales c/m", series: "3", reps: "10-12", rir: "1", kg: "3 a 5Xl?", videoId: "3VcKaXpzqRo" },
          { nombre: "Banco abdominal", series: "3", reps: "12-15", rir: "1", kg: "5kg?", videoId: "Xyd_fa5zoEU" },
          { nombre: "Trasnuca c/cuerda", series: "3", reps: "12-15", rir: "1", kg: "?", videoId: "U1bnGVP5E_w" },
        ],
      },
      {
        dia: 4,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto rumano c/m", series: "4", reps: "8", rir: "-", kg: "10 a 20Xl?", videoId: "yoNxIcUYj-U" },
          { nombre: "Remo c/polea prono", series: "4", reps: "8", rir: "-", kg: "?", videoId: "GZbfZ033f74" },
          { nombre: "Hip Thrust c/maquina", series: "4", reps: "10", rir: "--", kg: "20 a 40?", videoId: "3SHkXmrQtxQ" },
          { nombre: "Serrucho", series: "4", reps: "10", rir: "-", kg: "7 a 12?", videoId: "QdlygCkqMkM" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "12", rir: "-", kg: "?", videoId: "4A7Nv_KpEMk" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12", rir: "-", kg: "-", videoId: "JB2oyawG9KI" },
        ],
      },
    ],
  },

  // ══════════════════════════════════════
  // MES 5 — Fuerza + Hipertrofia
  // Inicio: Finales de Abril — Duración: 8 semanas
  // ══════════════════════════════════════
  {
    mes: 5,
    nombre: "MES 5",
    objetivo: "Fuerza + Hipertrofia",
    duracion: "8 semanas",
    inicio: "Finales de Abril",
    dias: [
      {
        dia: 1,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Hip Thrust c/maquina", series: "3", reps: "6-8", rir: "1", kg: "?", videoId: "3SHkXmrQtxQ" },
          { nombre: "Press banca c/pausa", series: "3", reps: "6-8", rir: "1", kg: "12 a 24k?", videoId: "2uONVXReAYc" },
          { nombre: "Búlgara c/pausa 1\"", series: "3", reps: "8-10", rir: "1", kg: "10 a 17Xl?", videoId: "eRu6mmpofHk" },
          { nombre: "Jalón unilateral (sentado)", series: "3", reps: "8-10", rir: "1", kg: "?", videoId: "gMC3IJPMmJI" },
          { nombre: "Aductores en maquina", series: "3", reps: "10-12", rir: "1", kg: "40 a 60k?", videoId: "xqMbMqE3Obw" },
          { nombre: "Rueda abdominal", series: "3", reps: "12-15", rir: "1", kg: "-", videoId: "ik0tYqfuheg" },
        ],
      },
      {
        dia: 2,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto 1 pie c/m", series: "3", reps: "6-8", rir: "1", kg: "15 a 25k?", videoId: "D6AJIAY_N6g" },
          { nombre: "Remo c/barra (prono)", series: "3", reps: "6-8", rir: "1", kg: "15 a 25k?", videoId: "cx9jVcdKfp0" },
          { nombre: "Camilla cuadriceps 1 pie", series: "3", reps: "12-15", rir: "1", kg: "9 a 12l?", videoId: "YyvSfVjQeL0" },
          { nombre: "Press con maquina", series: "3", reps: "8-10", rir: "1", kg: "4 a 10k?", videoId: "qEwKCR5JCog" },
          { nombre: "Patada de gluteo c/polea c/banco inclinado", series: "3", reps: "10-12", rir: "1", kg: "?", videoId: "VpiZcwGQJM0" },
          { nombre: "Elevaciones de pierna y cadera", series: "3", reps: "10-12", rir: "1", kg: "-", videoId: "JB2oyawG9KI" },
        ],
      },
      {
        dia: 3,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Prensa tempo 5\"", series: "3", reps: "6-8", rir: "1", kg: "80 a 100k?", videoId: "MEROVtQA9yY" },
          { nombre: "Rack Chins 2", series: "3", reps: "6-8", rir: "1", kg: "-", videoId: "rloXn5HVaQM" },
          { nombre: "Curl isquios 1-1/4", series: "3", reps: "8-10", rir: "1", kg: "4 a 6l?", videoId: "Orxowest56U" },
          { nombre: "Vuelos laterales tempo", series: "3", reps: "8-10", rir: "1", kg: "3 a 5Xl?", videoId: "3VcKaXpzqRo" },
          { nombre: "Crunch c/polea", series: "3", reps: "12-15", rir: "1", kg: "?", videoId: "AV5PkoPMB2A" },
          { nombre: "Press katana", series: "3", reps: "12-15", rir: "1", kg: "?", videoId: "U1bnGVP5E_w" },
        ],
      },
      {
        dia: 4,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto rumano c/m", series: "4", reps: "8", rir: "-", kg: "10 a 20Xl?", videoId: "yoNxIcUYj-U" },
          { nombre: "Remo c/polea prono", series: "4", reps: "8", rir: "-", kg: "?", videoId: "GZbfZ033f74" },
          { nombre: "Hip Thrust c/maquina", series: "4", reps: "10", rir: "--", kg: "20 a 40?", videoId: "3SHkXmrQtxQ" },
          { nombre: "Serrucho", series: "4", reps: "10", rir: "-", kg: "7 a 12?", videoId: "QdlygCkqMkM" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "12", rir: "-", kg: "?", videoId: "4A7Nv_KpEMk" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12", rir: "-", kg: "-", videoId: "JB2oyawG9KI" },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────
// SEMANAS INDIVIDUALES (con seguimiento por semana)
// Datos de semanas 1-15 con ejercicios y pesos
// ─────────────────────────────────────────────────
export const semanas = [
  {
    semana: 1,
    sesiones: [
      {
        sesion: 1,
        ejercicios: [
          { nombre: "Prensa", series: "3", reps: "8-10", kg: "120", rir: 4, videoId: "MEROVtQA9yY" },
          { nombre: "Camilla cuadriceps 1 pie", series: "3", reps: "10-12", kg: "12 a 14L?", rir: 3, videoId: "YyvSfVjQeL0" },
          { nombre: "Lagartijas", series: "3", reps: "6-8", kg: "4to?", rir: 4, videoId: "IODxDxX7oi4" },
          { nombre: "Press vertical c/mancuernas", series: "3", reps: "10-12", kg: "8xL?", rir: 3, videoId: "qEwKCR5JCog" },
          { nombre: "Plancha Copenhague", series: "3", reps: '25"', kg: "-", rir: 2, videoId: "e1zcHjQWpxs" },
          { nombre: "Bicho muerto a 2 pies", series: "3", reps: "12", kg: "5K", rir: 2, videoId: "vfxEpH_mITs" },
        ],
      },
      {
        sesion: 2,
        ejercicios: [
          { nombre: "Peso muerto convencional", series: "3", reps: "8-10", kg: "50K?", rir: 4, videoId: "kancsOn7CJY" },
          { nombre: "Camilla de femorales", series: "3", reps: "10-12", kg: "5L?", rir: 3, videoId: "Orxowest56U" },
          { nombre: "Rack Chins 1", series: "3", reps: "8-10", kg: "7?", rir: 4, videoId: "rloXn5HVaQM" },
          { nombre: "Remo c/barra (prono)", series: "3", reps: "10-12", kg: "10 a 20K?", rir: 3, videoId: "cx9jVcdKfp0" },
          { nombre: "Puente de gluteo unipodal", series: "3", reps: "17-20", kg: "10K?", rir: 2, videoId: "Q_ztEPQ_bFk" },
          { nombre: "Twist", series: "3", reps: "12-15", kg: "5K", rir: 2, videoId: "lKGfIlilMwQ" },
        ],
      },
      {
        sesion: 3,
        ejercicios: [
          { nombre: "Sentadilla c/pausa", series: "3", reps: "8-10", kg: "30kG?", rir: 4, videoId: "9FDZ5pAuhI4" },
          { nombre: "Estocadas", series: "3", reps: "10-12", kg: "15xL?", rir: 3, videoId: "eRu6mmpofHk" },
          { nombre: "Press banca c/pausa", series: "3", reps: "8-10", kg: "12KG?", rir: 4, videoId: "2uONVXReAYc" },
          { nombre: "Vuelos laterales c/m", series: "3", reps: "10-12", kg: "3 o 4KG?", rir: 3, videoId: "3VcKaXpzqRo" },
          { nombre: "Crunch c/brazos extendidos", series: "3", reps: "12", kg: "2.5", rir: 2, videoId: "Xyd_fa5zoEU" },
          { nombre: "Press Pallof", series: "3", reps: '20"', kg: "-", rir: 2, videoId: "5rFCgGPvEQY" },
        ],
      },
      {
        sesion: 4,
        ejercicios: [
          { nombre: "Rumano c/barra", series: "3", reps: "8-10", kg: "30KG", rir: 4, videoId: "NIng2JWF1Rs" },
          { nombre: "Hip Thrust c/maquina", series: "3", reps: "10-12", kg: "50KG?", rir: 3, videoId: "3SHkXmrQtxQ" },
          { nombre: "Remo c/polea (neutro)", series: "3", reps: "8-10", kg: "?", rir: 4, videoId: "GZbfZ033f74" },
          { nombre: "Jalón unilateral (arrodillado)", series: "3", reps: "10-12", kg: "?", rir: 3, videoId: "gMC3IJPMmJI" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "17-20", kg: "VERDE", rir: 2, videoId: "4A7Nv_KpEMk" },
          { nombre: "Rueda abdominal", series: "3", reps: "12-15", kg: "-", rir: 2, videoId: "ik0tYqfuheg" },
        ],
      },
    ],
  },
  // Semana 2-15 siguen el mismo patrón con pesos progresivos
  // Para agregar más semanas, copiar y modificar el bloque de arriba
];

// ─────────────────────────────────────────────────
// GRUPOS MUSCULARES (para referencia)
// ─────────────────────────────────────────────────
export const gruposMusculares = [
  { letra: "G", nombre: "Glúteo" },
  { letra: "C", nombre: "Cuadriceps" },
  { letra: "I", nombre: "Isquios" },
  { letra: "P", nombre: "Pectoral" },
  { letra: "E", nombre: "Espalda" },
  { letra: "B", nombre: "Bíceps" },
  { letra: "T", nombre: "Tríceps" },
  { letra: "L", nombre: "Hombro lateral" },
  { letra: "ZM", nombre: "Zona media" },
];
