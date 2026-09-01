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
        { nombre: "90-90 Cadera", series: 2, reps: "6xL", videoId: "" },
        { nombre: "Bicho muerto a un pie", series: 2, reps: "10 total", videoId: "" },
        { nombre: "Movilidad cadera + dorsal", series: 2, reps: "6xL", videoId: "" },
        { nombre: "Dorsiflexión de tobillo", series: 2, reps: "6xL", videoId: "" },
      ],
    },
    {
      dia: 2,
      ejercicios: [
        { nombre: "Bisagra de cadera c/bastón", series: 2, reps: "8", videoId: "" },
        { nombre: "Face Pull", series: 2, reps: "10", videoId: "" },
        { nombre: "Bicho muerto a un pie", series: 2, reps: "10 total", videoId: "" },
      ],
    },
    {
      dia: 3,
      ejercicios: [
        { nombre: "Movilidad cadera + dorsal", series: 2, reps: "6xL", videoId: "" },
        { nombre: "Dorsiflexión de tobillo", series: 2, reps: "6xL", videoId: "" },
        { nombre: 'Plancha "Toco adelante"', series: 2, reps: "5xL", videoId: "" },
      ],
    },
    {
      dia: 4,
      ejercicios: [
        { nombre: "Bisagra de cadera c/bastón", series: 2, reps: "8", videoId: "" },
        { nombre: "Bicho muerto a un pie", series: 2, reps: "10 total", videoId: "" },
        { nombre: "Caminata c/manos", series: 2, reps: "6", videoId: "" },
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
          { nombre: "Sentadilla barra alta", series: "4", reps: "8", rir: "-", kg: "20?", videoId: "" },
          { nombre: "Press banca c/pausa", series: "4", reps: "8", rir: "-", kg: "10 a 20?", videoId: "" },
          { nombre: "Camilla cuadriceps", series: "4", reps: "10", rir: "--", kg: "10l?", videoId: "" },
          { nombre: "Press c/m sentado", series: "4", reps: "10", rir: "-", kg: "5 a 8Xl?", videoId: "" },
          { nombre: "Aductores en maquina", series: "3", reps: "12", rir: "-", kg: "20 a 35?", videoId: "" },
          { nombre: "Plancha frontal fitball", series: "3", reps: '20-30"', rir: "-", kg: "-", videoId: "" },
        ],
      },
      {
        dia: 2,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto convencional", series: "4", reps: "8", rir: "-", kg: "20?", videoId: "" },
          { nombre: "Jalón al pecho (supino)", series: "4", reps: "8", rir: "-", kg: "?", videoId: "" },
          { nombre: "Camilla de femorales", series: "4", reps: "10", rir: "--", kg: "3 a 6L?", videoId: "" },
          { nombre: "Remo c/TRX", series: "4", reps: "10", rir: "-", kg: "-", videoId: "" },
          { nombre: "Patada gluteo c/polea", series: "3", reps: "12", rir: "-", kg: "?", videoId: "" },
          { nombre: "Twist", series: "3", reps: "12xL", rir: "-", kg: "5KG?", videoId: "" },
        ],
      },
      {
        dia: 3,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Sentadilla Smith (tronco vertical)", series: "4", reps: "8", rir: "-", kg: "10 a 20?", videoId: "" },
          { nombre: "Press inclinado c/m", series: "4", reps: "8", rir: "-", kg: "6 a 8Xl?", videoId: "" },
          { nombre: "Estocadas", series: "4", reps: "10", rir: "--", kg: "5 a 10Xl?", videoId: "" },
          { nombre: "Vuelos laterales c/m", series: "4", reps: "10", rir: "-", kg: "3 a 5Xl?", videoId: "" },
          { nombre: "Crunch", series: "3", reps: "12", rir: "-", kg: "5kg?", videoId: "" },
          { nombre: "Tras nuca c/m", series: "3", reps: "12", rir: "-", kg: "5 a 8k?", videoId: "" },
        ],
      },
      {
        dia: 4,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto rumano c/m", series: "4", reps: "8", rir: "-", kg: "10 a 20Xl?", videoId: "" },
          { nombre: "Remo c/polea prono", series: "4", reps: "8", rir: "-", kg: "?", videoId: "" },
          { nombre: "Hip Thrust c/maquina", series: "4", reps: "10", rir: "--", kg: "20 a 40?", videoId: "" },
          { nombre: "Serrucho", series: "4", reps: "10", rir: "-", kg: "7 a 12?", videoId: "" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "12", rir: "-", kg: "?", videoId: "" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12", rir: "-", kg: "-", videoId: "" },
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
          { nombre: "Sentadilla barra alta", series: "4", reps: "8", rir: "-", kg: "20?", videoId: "" },
          { nombre: "Press banca c/pausa", series: "4", reps: "8", rir: "-", kg: "10 a 20?", videoId: "" },
          { nombre: "Camilla cuadriceps", series: "4", reps: "10", rir: "--", kg: "10l?", videoId: "" },
          { nombre: "Press c/m sentado", series: "4", reps: "10", rir: "-", kg: "5 a 8Xl?", videoId: "" },
          { nombre: "Aductores en maquina", series: "3", reps: "12", rir: "-", kg: "20 a 35?", videoId: "" },
          { nombre: "Plancha frontal fitball", series: "3", reps: '20-30"', rir: "-", kg: "-", videoId: "" },
        ],
      },
      {
        dia: 2,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto convencional", series: "4", reps: "8", rir: "-", kg: "20?", videoId: "" },
          { nombre: "Jalón al pecho (supino)", series: "4", reps: "8", rir: "-", kg: "?", videoId: "" },
          { nombre: "Camilla de femorales", series: "4", reps: "10", rir: "--", kg: "3 a 6L?", videoId: "" },
          { nombre: "Remo c/TRX", series: "4", reps: "10", rir: "-", kg: "-", videoId: "" },
          { nombre: "Patada gluteo c/polea", series: "3", reps: "12", rir: "-", kg: "?", videoId: "" },
          { nombre: "Twist", series: "3", reps: "12xL", rir: "-", kg: "5KG?", videoId: "" },
        ],
      },
      {
        dia: 3,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Sentadilla Smith (tronco vertical)", series: "4", reps: "8", rir: "-", kg: "10 a 20?", videoId: "" },
          { nombre: "Press inclinado c/m", series: "4", reps: "8", rir: "-", kg: "6 a 8Xl?", videoId: "" },
          { nombre: "Estocadas", series: "4", reps: "10", rir: "--", kg: "5 a 10Xl?", videoId: "" },
          { nombre: "Vuelos laterales c/m", series: "4", reps: "10", rir: "-", kg: "3 a 5Xl?", videoId: "" },
          { nombre: "Crunch", series: "3", reps: "12", rir: "-", kg: "5kg?", videoId: "" },
          { nombre: "Tras nuca c/m", series: "3", reps: "12", rir: "-", kg: "5 a 8k?", videoId: "" },
        ],
      },
      {
        dia: 4,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto rumano c/m", series: "4", reps: "8", rir: "-", kg: "10 a 20Xl?", videoId: "" },
          { nombre: "Remo c/polea prono", series: "4", reps: "8", rir: "-", kg: "?", videoId: "" },
          { nombre: "Hip Thrust c/maquina", series: "4", reps: "10", rir: "--", kg: "20 a 40?", videoId: "" },
          { nombre: "Serrucho", series: "4", reps: "10", rir: "-", kg: "7 a 12?", videoId: "" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "12", rir: "-", kg: "?", videoId: "" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12", rir: "-", kg: "-", videoId: "" },
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
          { nombre: "Sentadilla Smith", series: "3", reps: "6-8", rir: "1", kg: "20 a 35k?", videoId: "" },
          { nombre: "Press banca c/pausa", series: "3", reps: "6-8", rir: "1", kg: "12 a 24k?", videoId: "" },
          { nombre: "Camilla de femorales", series: "2+AMRAP", reps: "10-12", rir: "1", kg: "3 a 6L?", videoId: "" },
          { nombre: "Jalón al pecho (supino)", series: "2+AMRAP", reps: "10-12", rir: "1", kg: "5 a 8Xl?", videoId: "" },
          { nombre: "Aductores en maquina", series: "2+AMRAP", reps: "12-15", rir: "1", kg: "20 a 35?", videoId: "" },
          { nombre: "Rueda c/fit", series: "3", reps: "12-15", rir: "1", kg: "-", videoId: "" },
        ],
      },
      {
        dia: 2,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Rumano c/barra", series: "3", reps: "6-8", rir: "1", kg: "20 a 35k?", videoId: "" },
          { nombre: "Remo c/polea prono", series: "3", reps: "6-8", rir: "1", kg: "?", videoId: "" },
          { nombre: "Camilla cuadriceps 1 pie", series: "3", reps: "10-12", rir: "1", kg: "9 a 12l?", videoId: "" },
          { nombre: "Press c/m sentado 1/4", series: "3", reps: "10-12", rir: "-", kg: "?", videoId: "" },
          { nombre: "Patada gluteo c/polea", series: "2+AMRAP", reps: "12-15", rir: "1", kg: "?", videoId: "" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12-15", rir: "1", kg: "5KG?", videoId: "" },
        ],
      },
      {
        dia: 3,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Hip Thrust c/barra", series: "3", reps: "6-8", rir: "1", kg: "40 a 60k?", videoId: "" },
          { nombre: "Rack Chins 1", series: "3", reps: "6-8", rir: "1", kg: "-", videoId: "" },
          { nombre: "Búlgaras", series: "3", reps: "10-12", rir: "1", kg: "5 a 10Xl?", videoId: "" },
          { nombre: "Vuelos laterales c/m", series: "2+AMRAP", reps: "10-12", rir: "1", kg: "3 a 5Xl?", videoId: "" },
          { nombre: "Banco abdominal", series: "3", reps: "12-15", rir: "1", kg: "5kg?", videoId: "" },
          { nombre: "Trasnuca c/cuerda", series: "3", reps: "12-15", rir: "1", kg: "?", videoId: "" },
        ],
      },
      {
        dia: 4,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto rumano c/m", series: "4", reps: "8", rir: "-", kg: "10 a 20Xl?", videoId: "" },
          { nombre: "Remo c/polea prono", series: "4", reps: "8", rir: "-", kg: "?", videoId: "" },
          { nombre: "Hip Thrust c/maquina", series: "4", reps: "10", rir: "--", kg: "20 a 40?", videoId: "" },
          { nombre: "Serrucho", series: "4", reps: "10", rir: "-", kg: "7 a 12?", videoId: "" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "12", rir: "-", kg: "?", videoId: "" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12", rir: "-", kg: "-", videoId: "" },
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
          { nombre: "Sentadilla Smith", series: "3", reps: "6-8", rir: "1", kg: "20 a 35k?", videoId: "" },
          { nombre: "Press banca c/pausa", series: "3", reps: "6-8", rir: "1", kg: "12 a 24k?", videoId: "" },
          { nombre: "Camilla de femorales", series: "3", reps: "10-12", rir: "1", kg: "3 a 6L?", videoId: "" },
          { nombre: "Jalón al pecho (supino)", series: "3", reps: "10-12", rir: "1", kg: "5 a 8Xl?", videoId: "" },
          { nombre: "Aductores en maquina", series: "3", reps: "12-15", rir: "1", kg: "20 a 35?", videoId: "" },
          { nombre: "Rueda c/fit", series: "3", reps: "12-15", rir: "1", kg: "-", videoId: "" },
        ],
      },
      {
        dia: 2,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Rumano c/barra", series: "3", reps: "6-8", rir: "1", kg: "20 a 35k?", videoId: "" },
          { nombre: "Remo c/polea prono", series: "3", reps: "6-8", rir: "1", kg: "?", videoId: "" },
          { nombre: "Camilla cuadriceps 1 pie", series: "3", reps: "10-12", rir: "1", kg: "9 a 12l?", videoId: "" },
          { nombre: "Press c/m sentado 1/4", series: "3", reps: "10-12", rir: "-", kg: "?", videoId: "" },
          { nombre: "Patada gluteo c/polea", series: "3", reps: "12-15", rir: "1", kg: "?", videoId: "" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12-15", rir: "1", kg: "5KG?", videoId: "" },
        ],
      },
      {
        dia: 3,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Hip Thrust c/barra", series: "3", reps: "6-8", rir: "1", kg: "40 a 60k?", videoId: "" },
          { nombre: "Rack Chins 1", series: "3", reps: "6-8", rir: "1", kg: "-", videoId: "" },
          { nombre: "Búlgaras", series: "3", reps: "10-12", rir: "1", kg: "5 a 10Xl?", videoId: "" },
          { nombre: "Vuelos laterales c/m", series: "3", reps: "10-12", rir: "1", kg: "3 a 5Xl?", videoId: "" },
          { nombre: "Banco abdominal", series: "3", reps: "12-15", rir: "1", kg: "5kg?", videoId: "" },
          { nombre: "Trasnuca c/cuerda", series: "3", reps: "12-15", rir: "1", kg: "?", videoId: "" },
        ],
      },
      {
        dia: 4,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto rumano c/m", series: "4", reps: "8", rir: "-", kg: "10 a 20Xl?", videoId: "" },
          { nombre: "Remo c/polea prono", series: "4", reps: "8", rir: "-", kg: "?", videoId: "" },
          { nombre: "Hip Thrust c/maquina", series: "4", reps: "10", rir: "--", kg: "20 a 40?", videoId: "" },
          { nombre: "Serrucho", series: "4", reps: "10", rir: "-", kg: "7 a 12?", videoId: "" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "12", rir: "-", kg: "?", videoId: "" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12", rir: "-", kg: "-", videoId: "" },
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
          { nombre: "Hip Thrust c/maquina", series: "3", reps: "6-8", rir: "1", kg: "?", videoId: "" },
          { nombre: "Press banca c/pausa", series: "3", reps: "6-8", rir: "1", kg: "12 a 24k?", videoId: "" },
          { nombre: "Búlgara c/pausa 1\"", series: "3", reps: "8-10", rir: "1", kg: "10 a 17Xl?", videoId: "" },
          { nombre: "Jalón unilateral (sentado)", series: "3", reps: "8-10", rir: "1", kg: "?", videoId: "" },
          { nombre: "Aductores en maquina", series: "3", reps: "10-12", rir: "1", kg: "40 a 60k?", videoId: "" },
          { nombre: "Rueda abdominal", series: "3", reps: "12-15", rir: "1", kg: "-", videoId: "" },
        ],
      },
      {
        dia: 2,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto 1 pie c/m", series: "3", reps: "6-8", rir: "1", kg: "15 a 25k?", videoId: "" },
          { nombre: "Remo c/barra (prono)", series: "3", reps: "6-8", rir: "1", kg: "15 a 25k?", videoId: "" },
          { nombre: "Camilla cuadriceps 1 pie", series: "3", reps: "12-15", rir: "1", kg: "9 a 12l?", videoId: "" },
          { nombre: "Press con maquina", series: "3", reps: "8-10", rir: "1", kg: "4 a 10k?", videoId: "" },
          { nombre: "Patada de gluteo c/polea c/banco inclinado", series: "3", reps: "10-12", rir: "1", kg: "?", videoId: "" },
          { nombre: "Elevaciones de pierna y cadera", series: "3", reps: "10-12", rir: "1", kg: "-", videoId: "" },
        ],
      },
      {
        dia: 3,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Prensa tempo 5\"", series: "3", reps: "6-8", rir: "1", kg: "80 a 100k?", videoId: "" },
          { nombre: "Rack Chins 2", series: "3", reps: "6-8", rir: "1", kg: "-", videoId: "" },
          { nombre: "Curl isquios 1-1/4", series: "3", reps: "8-10", rir: "1", kg: "4 a 6l?", videoId: "" },
          { nombre: "Vuelos laterales tempo", series: "3", reps: "8-10", rir: "1", kg: "3 a 5Xl?", videoId: "" },
          { nombre: "Crunch c/polea", series: "3", reps: "12-15", rir: "1", kg: "?", videoId: "" },
          { nombre: "Press katana", series: "3", reps: "12-15", rir: "1", kg: "?", videoId: "" },
        ],
      },
      {
        dia: 4,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto rumano c/m", series: "4", reps: "8", rir: "-", kg: "10 a 20Xl?", videoId: "" },
          { nombre: "Remo c/polea prono", series: "4", reps: "8", rir: "-", kg: "?", videoId: "" },
          { nombre: "Hip Thrust c/maquina", series: "4", reps: "10", rir: "--", kg: "20 a 40?", videoId: "" },
          { nombre: "Serrucho", series: "4", reps: "10", rir: "-", kg: "7 a 12?", videoId: "" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "12", rir: "-", kg: "?", videoId: "" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12", rir: "-", kg: "-", videoId: "" },
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
          { nombre: "Prensa", series: "3", reps: "8-10", kg: "120", rir: 4, videoId: "" },
          { nombre: "Camilla cuadriceps 1 pie", series: "3", reps: "10-12", kg: "12 a 14L?", rir: 3, videoId: "" },
          { nombre: "Lagartijas", series: "3", reps: "6-8", kg: "4to?", rir: 4, videoId: "" },
          { nombre: "Press vertical c/mancuernas", series: "3", reps: "10-12", kg: "8xL?", rir: 3, videoId: "" },
          { nombre: "Plancha Copenhague", series: "3", reps: '25"', kg: "-", rir: 2, videoId: "" },
          { nombre: "Bicho muerto a 2 pies", series: "3", reps: "12", kg: "5K", rir: 2, videoId: "" },
        ],
      },
      {
        sesion: 2,
        ejercicios: [
          { nombre: "Peso muerto convencional", series: "3", reps: "8-10", kg: "50K?", rir: 4, videoId: "" },
          { nombre: "Camilla de femorales", series: "3", reps: "10-12", kg: "5L?", rir: 3, videoId: "" },
          { nombre: "Rack Chins 1", series: "3", reps: "8-10", kg: "7?", rir: 4, videoId: "" },
          { nombre: "Remo c/barra (prono)", series: "3", reps: "10-12", kg: "10 a 20K?", rir: 3, videoId: "" },
          { nombre: "Puente de gluteo unipodal", series: "3", reps: "17-20", kg: "10K?", rir: 2, videoId: "" },
          { nombre: "Twist", series: "3", reps: "12-15", kg: "5K", rir: 2, videoId: "" },
        ],
      },
      {
        sesion: 3,
        ejercicios: [
          { nombre: "Sentadilla c/pausa", series: "3", reps: "8-10", kg: "30kG?", rir: 4, videoId: "" },
          { nombre: "Estocadas", series: "3", reps: "10-12", kg: "15xL?", rir: 3, videoId: "" },
          { nombre: "Press banca c/pausa", series: "3", reps: "8-10", kg: "12KG?", rir: 4, videoId: "" },
          { nombre: "Vuelos laterales c/m", series: "3", reps: "10-12", kg: "3 o 4KG?", rir: 3, videoId: "" },
          { nombre: "Crunch c/brazos extendidos", series: "3", reps: "12", kg: "2.5", rir: 2, videoId: "" },
          { nombre: "Press Pallof", series: "3", reps: '20"', kg: "-", rir: 2, videoId: "" },
        ],
      },
      {
        sesion: 4,
        ejercicios: [
          { nombre: "Rumano c/barra", series: "3", reps: "8-10", kg: "30KG", rir: 4, videoId: "" },
          { nombre: "Hip Thrust c/maquina", series: "3", reps: "10-12", kg: "50KG?", rir: 3, videoId: "" },
          { nombre: "Remo c/polea (neutro)", series: "3", reps: "8-10", kg: "?", rir: 4, videoId: "" },
          { nombre: "Jalón unilateral (arrodillado)", series: "3", reps: "10-12", kg: "?", rir: 3, videoId: "" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "17-20", kg: "VERDE", rir: 2, videoId: "" },
          { nombre: "Rueda abdominal", series: "3", reps: "12-15", kg: "-", rir: 2, videoId: "" },
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
