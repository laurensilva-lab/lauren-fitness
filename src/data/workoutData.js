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
        { nombre: "90-90 Cadera", series: 2, reps: "6xL", videoId: "OkMzebV4ZVs" },
        { nombre: "Bicho muerto a un pie", series: 2, reps: "10 total", videoId: "5WtBQleRYMg" },
        { nombre: "Movilidad cadera + dorsal", series: 2, reps: "6xL", videoId: "FJirSIvgHAE" },
        { nombre: "Dorsiflexión de tobillo", series: 2, reps: "6xL", videoId: "r9Cj3D8hWmM" },
      ],
    },
    {
      dia: 2,
      ejercicios: [
        { nombre: "Bisagra de cadera c/bastón", series: 2, reps: "8", videoId: "itlmnXKlIC4" },
        { nombre: "Face Pull", series: 2, reps: "10", videoId: "CT7JCnA7uwM" },
        { nombre: "Bicho muerto a un pie", series: 2, reps: "10 total", videoId: "5WtBQleRYMg" },
      ],
    },
    {
      dia: 3,
      ejercicios: [
        { nombre: "Movilidad cadera + dorsal", series: 2, reps: "6xL", videoId: "FJirSIvgHAE" },
        { nombre: "Dorsiflexión de tobillo", series: 2, reps: "6xL", videoId: "r9Cj3D8hWmM" },
        { nombre: 'Plancha "Toco adelante"', series: 2, reps: "5xL", videoId: "w8LaLXDtpsQ" },
      ],
    },
    {
      dia: 4,
      ejercicios: [
        { nombre: "Bisagra de cadera c/bastón", series: 2, reps: "8", videoId: "itlmnXKlIC4" },
        { nombre: "Bicho muerto a un pie", series: 2, reps: "10 total", videoId: "5WtBQleRYMg" },
        { nombre: "Caminata c/manos", series: 2, reps: "6", videoId: "XmXLooMQLfU" },
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
          { nombre: "Sentadilla barra alta", series: "4", reps: "8", rir: "-", kg: "20?", videoId: "LFyVjlPoiVA" },
          { nombre: "Press banca c/pausa", series: "4", reps: "8", rir: "-", kg: "10 a 20?", videoId: "gR8tfunTwN4" },
          { nombre: "Camilla cuadriceps", series: "4", reps: "10", rir: "--", kg: "10l?", videoId: "MpEydcQ1oDw" },
          { nombre: "Press c/m sentado", series: "4", reps: "10", rir: "-", kg: "5 a 8Xl?", videoId: "56lfDVYDPls" },
          { nombre: "Aductores en maquina", series: "3", reps: "12", rir: "-", kg: "20 a 35?", videoId: "AhxXC7ZLw0I" },
          { nombre: "Plancha frontal fitball", series: "3", reps: '20-30"', rir: "-", kg: "-", videoId: "aE3mKyxCeck" },
        ],
      },
      {
        dia: 2,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto convencional", series: "4", reps: "8", rir: "-", kg: "20?", videoId: "roi1lZP8Q0Q" },
          { nombre: "Jalón al pecho (supino)", series: "4", reps: "8", rir: "-", kg: "?", videoId: "VnLY_duYJKI" },
          { nombre: "Camilla de femorales", series: "4", reps: "10", rir: "--", kg: "3 a 6L?", videoId: "B6t8MvbTtew" },
          { nombre: "Remo c/TRX", series: "4", reps: "10", rir: "-", kg: "-", videoId: "zWRGsR9EIOc" },
          { nombre: "Patada gluteo c/polea", series: "3", reps: "12", rir: "-", kg: "?", videoId: "_Ldf8Gh4Ai8" },
          { nombre: "Twist", series: "3", reps: "12xL", rir: "-", kg: "5KG?", videoId: "koedXVmNYrQ" },
        ],
      },
      {
        dia: 3,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Sentadilla Smith (tronco vertical)", series: "4", reps: "8", rir: "-", kg: "10 a 20?", videoId: "iCOBGhyK4sQ" },
          { nombre: "Press inclinado c/m", series: "4", reps: "8", rir: "-", kg: "6 a 8Xl?", videoId: "B2lHFgA3POA" },
          { nombre: "Estocadas", series: "4", reps: "10", rir: "--", kg: "5 a 10Xl?", videoId: "4clFA-eafpc" },
          { nombre: "Vuelos laterales c/m", series: "4", reps: "10", rir: "-", kg: "3 a 5Xl?", videoId: "gBeIzdiagnQ" },
          { nombre: "Crunch", series: "3", reps: "12", rir: "-", kg: "5kg?", videoId: "R40BWEihg_Q" },
          { nombre: "Tras nuca c/m", series: "3", reps: "12", rir: "-", kg: "5 a 8k?", videoId: "JsIUL2ZK1eM" },
        ],
      },
      {
        dia: 4,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto rumano c/m", series: "4", reps: "8", rir: "-", kg: "10 a 20Xl?", videoId: "X9mz4c0yz3M" },
          { nombre: "Remo c/polea prono", series: "4", reps: "8", rir: "-", kg: "?", videoId: "Vm6E-2tq0bU" },
          { nombre: "Hip Thrust c/maquina", series: "4", reps: "10", rir: "--", kg: "20 a 40?", videoId: "Mrle3041xrY" },
          { nombre: "Serrucho", series: "4", reps: "10", rir: "-", kg: "7 a 12?", videoId: "xl1YiqQY2vA" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "12", rir: "-", kg: "?", videoId: "KRjONywfvs4" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12", rir: "-", kg: "-", videoId: "3cizD-Mg2II" },
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
          { nombre: "Sentadilla barra alta", series: "4", reps: "8", rir: "-", kg: "20?", videoId: "LFyVjlPoiVA" },
          { nombre: "Press banca c/pausa", series: "4", reps: "8", rir: "-", kg: "10 a 20?", videoId: "gR8tfunTwN4" },
          { nombre: "Camilla cuadriceps", series: "4", reps: "10", rir: "--", kg: "10l?", videoId: "MpEydcQ1oDw" },
          { nombre: "Press c/m sentado", series: "4", reps: "10", rir: "-", kg: "5 a 8Xl?", videoId: "56lfDVYDPls" },
          { nombre: "Aductores en maquina", series: "3", reps: "12", rir: "-", kg: "20 a 35?", videoId: "AhxXC7ZLw0I" },
          { nombre: "Plancha frontal fitball", series: "3", reps: '20-30"', rir: "-", kg: "-", videoId: "aE3mKyxCeck" },
        ],
      },
      {
        dia: 2,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto convencional", series: "4", reps: "8", rir: "-", kg: "20?", videoId: "roi1lZP8Q0Q" },
          { nombre: "Jalón al pecho (supino)", series: "4", reps: "8", rir: "-", kg: "?", videoId: "VnLY_duYJKI" },
          { nombre: "Camilla de femorales", series: "4", reps: "10", rir: "--", kg: "3 a 6L?", videoId: "B6t8MvbTtew" },
          { nombre: "Remo c/TRX", series: "4", reps: "10", rir: "-", kg: "-", videoId: "zWRGsR9EIOc" },
          { nombre: "Patada gluteo c/polea", series: "3", reps: "12", rir: "-", kg: "?", videoId: "_Ldf8Gh4Ai8" },
          { nombre: "Twist", series: "3", reps: "12xL", rir: "-", kg: "5KG?", videoId: "koedXVmNYrQ" },
        ],
      },
      {
        dia: 3,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Sentadilla Smith (tronco vertical)", series: "4", reps: "8", rir: "-", kg: "10 a 20?", videoId: "iCOBGhyK4sQ" },
          { nombre: "Press inclinado c/m", series: "4", reps: "8", rir: "-", kg: "6 a 8Xl?", videoId: "B2lHFgA3POA" },
          { nombre: "Estocadas", series: "4", reps: "10", rir: "--", kg: "5 a 10Xl?", videoId: "4clFA-eafpc" },
          { nombre: "Vuelos laterales c/m", series: "4", reps: "10", rir: "-", kg: "3 a 5Xl?", videoId: "gBeIzdiagnQ" },
          { nombre: "Crunch", series: "3", reps: "12", rir: "-", kg: "5kg?", videoId: "R40BWEihg_Q" },
          { nombre: "Tras nuca c/m", series: "3", reps: "12", rir: "-", kg: "5 a 8k?", videoId: "JsIUL2ZK1eM" },
        ],
      },
      {
        dia: 4,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto rumano c/m", series: "4", reps: "8", rir: "-", kg: "10 a 20Xl?", videoId: "X9mz4c0yz3M" },
          { nombre: "Remo c/polea prono", series: "4", reps: "8", rir: "-", kg: "?", videoId: "Vm6E-2tq0bU" },
          { nombre: "Hip Thrust c/maquina", series: "4", reps: "10", rir: "--", kg: "20 a 40?", videoId: "Mrle3041xrY" },
          { nombre: "Serrucho", series: "4", reps: "10", rir: "-", kg: "7 a 12?", videoId: "xl1YiqQY2vA" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "12", rir: "-", kg: "?", videoId: "KRjONywfvs4" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12", rir: "-", kg: "-", videoId: "3cizD-Mg2II" },
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
          { nombre: "Sentadilla Smith", series: "3", reps: "6-8", rir: "1", kg: "20 a 35k?", videoId: "-eO_VydErV0" },
          { nombre: "Press banca c/pausa", series: "3", reps: "6-8", rir: "1", kg: "12 a 24k?", videoId: "gR8tfunTwN4" },
          { nombre: "Camilla de femorales", series: "2+AMRAP", reps: "10-12", rir: "1", kg: "3 a 6L?", videoId: "B6t8MvbTtew" },
          { nombre: "Jalón al pecho (supino)", series: "2+AMRAP", reps: "10-12", rir: "1", kg: "5 a 8Xl?", videoId: "VnLY_duYJKI" },
          { nombre: "Aductores en maquina", series: "2+AMRAP", reps: "12-15", rir: "1", kg: "20 a 35?", videoId: "AhxXC7ZLw0I" },
          { nombre: "Rueda c/fit", series: "3", reps: "12-15", rir: "1", kg: "-", videoId: "8bQt5n6sAT4" },
        ],
      },
      {
        dia: 2,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Rumano c/barra", series: "3", reps: "6-8", rir: "1", kg: "20 a 35k?", videoId: "fiDKXCSi8YA" },
          { nombre: "Remo c/polea prono", series: "3", reps: "6-8", rir: "1", kg: "?", videoId: "Vm6E-2tq0bU" },
          { nombre: "Camilla cuadriceps 1 pie", series: "3", reps: "10-12", rir: "1", kg: "9 a 12l?", videoId: "RHOipBgmDvI" },
          { nombre: "Press c/m sentado 1/4", series: "3", reps: "10-12", rir: "-", kg: "?", videoId: "5s5yf--SbvI" },
          { nombre: "Patada gluteo c/polea", series: "2+AMRAP", reps: "12-15", rir: "1", kg: "?", videoId: "_Ldf8Gh4Ai8" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12-15", rir: "1", kg: "5KG?", videoId: "3cizD-Mg2II" },
        ],
      },
      {
        dia: 3,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Hip Thrust c/barra", series: "3", reps: "6-8", rir: "1", kg: "40 a 60k?", videoId: "7_1P_UfEAG0" },
          { nombre: "Rack Chins 1", series: "3", reps: "6-8", rir: "1", kg: "-", videoId: "bw9GdVFBvcQ" },
          { nombre: "Búlgaras", series: "3", reps: "10-12", rir: "1", kg: "5 a 10Xl?", videoId: "MGh5po3i5cE" },
          { nombre: "Vuelos laterales c/m", series: "2+AMRAP", reps: "10-12", rir: "1", kg: "3 a 5Xl?", videoId: "gBeIzdiagnQ" },
          { nombre: "Banco abdominal", series: "3", reps: "12-15", rir: "1", kg: "5kg?", videoId: "H2LPYWLXDc0" },
          { nombre: "Trasnuca c/cuerda", series: "3", reps: "12-15", rir: "1", kg: "?", videoId: "LMWAnfFls9U" },
        ],
      },
      {
        dia: 4,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto rumano c/m", series: "4", reps: "8", rir: "-", kg: "10 a 20Xl?", videoId: "X9mz4c0yz3M" },
          { nombre: "Remo c/polea prono", series: "4", reps: "8", rir: "-", kg: "?", videoId: "Vm6E-2tq0bU" },
          { nombre: "Hip Thrust c/maquina", series: "4", reps: "10", rir: "--", kg: "20 a 40?", videoId: "Mrle3041xrY" },
          { nombre: "Serrucho", series: "4", reps: "10", rir: "-", kg: "7 a 12?", videoId: "xl1YiqQY2vA" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "12", rir: "-", kg: "?", videoId: "KRjONywfvs4" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12", rir: "-", kg: "-", videoId: "3cizD-Mg2II" },
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
          { nombre: "Sentadilla Smith", series: "3", reps: "6-8", rir: "1", kg: "20 a 35k?", videoId: "-eO_VydErV0" },
          { nombre: "Press banca c/pausa", series: "3", reps: "6-8", rir: "1", kg: "12 a 24k?", videoId: "gR8tfunTwN4" },
          { nombre: "Camilla de femorales", series: "3", reps: "10-12", rir: "1", kg: "3 a 6L?", videoId: "B6t8MvbTtew" },
          { nombre: "Jalón al pecho (supino)", series: "3", reps: "10-12", rir: "1", kg: "5 a 8Xl?", videoId: "VnLY_duYJKI" },
          { nombre: "Aductores en maquina", series: "3", reps: "12-15", rir: "1", kg: "20 a 35?", videoId: "AhxXC7ZLw0I" },
          { nombre: "Rueda c/fit", series: "3", reps: "12-15", rir: "1", kg: "-", videoId: "8bQt5n6sAT4" },
        ],
      },
      {
        dia: 2,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Rumano c/barra", series: "3", reps: "6-8", rir: "1", kg: "20 a 35k?", videoId: "fiDKXCSi8YA" },
          { nombre: "Remo c/polea prono", series: "3", reps: "6-8", rir: "1", kg: "?", videoId: "Vm6E-2tq0bU" },
          { nombre: "Camilla cuadriceps 1 pie", series: "3", reps: "10-12", rir: "1", kg: "9 a 12l?", videoId: "RHOipBgmDvI" },
          { nombre: "Press c/m sentado 1/4", series: "3", reps: "10-12", rir: "-", kg: "?", videoId: "5s5yf--SbvI" },
          { nombre: "Patada gluteo c/polea", series: "3", reps: "12-15", rir: "1", kg: "?", videoId: "_Ldf8Gh4Ai8" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12-15", rir: "1", kg: "5KG?", videoId: "3cizD-Mg2II" },
        ],
      },
      {
        dia: 3,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Hip Thrust c/barra", series: "3", reps: "6-8", rir: "1", kg: "40 a 60k?", videoId: "7_1P_UfEAG0" },
          { nombre: "Rack Chins 1", series: "3", reps: "6-8", rir: "1", kg: "-", videoId: "bw9GdVFBvcQ" },
          { nombre: "Búlgaras", series: "3", reps: "10-12", rir: "1", kg: "5 a 10Xl?", videoId: "MGh5po3i5cE" },
          { nombre: "Vuelos laterales c/m", series: "3", reps: "10-12", rir: "1", kg: "3 a 5Xl?", videoId: "gBeIzdiagnQ" },
          { nombre: "Banco abdominal", series: "3", reps: "12-15", rir: "1", kg: "5kg?", videoId: "H2LPYWLXDc0" },
          { nombre: "Trasnuca c/cuerda", series: "3", reps: "12-15", rir: "1", kg: "?", videoId: "LMWAnfFls9U" },
        ],
      },
      {
        dia: 4,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto rumano c/m", series: "4", reps: "8", rir: "-", kg: "10 a 20Xl?", videoId: "X9mz4c0yz3M" },
          { nombre: "Remo c/polea prono", series: "4", reps: "8", rir: "-", kg: "?", videoId: "Vm6E-2tq0bU" },
          { nombre: "Hip Thrust c/maquina", series: "4", reps: "10", rir: "--", kg: "20 a 40?", videoId: "Mrle3041xrY" },
          { nombre: "Serrucho", series: "4", reps: "10", rir: "-", kg: "7 a 12?", videoId: "xl1YiqQY2vA" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "12", rir: "-", kg: "?", videoId: "KRjONywfvs4" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12", rir: "-", kg: "-", videoId: "3cizD-Mg2II" },
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
          { nombre: "Hip Thrust c/maquina", series: "3", reps: "6-8", rir: "1", kg: "?", videoId: "Mrle3041xrY" },
          { nombre: "Press banca c/pausa", series: "3", reps: "6-8", rir: "1", kg: "12 a 24k?", videoId: "gR8tfunTwN4" },
          { nombre: "Búlgara c/pausa 1\"", series: "3", reps: "8-10", rir: "1", kg: "10 a 17Xl?", videoId: "5Rv-CYntF-U" },
          { nombre: "Jalón unilateral (sentado)", series: "3", reps: "8-10", rir: "1", kg: "?", videoId: "VnLY_duYJKI" },
          { nombre: "Aductores en maquina", series: "3", reps: "10-12", rir: "1", kg: "40 a 60k?", videoId: "AhxXC7ZLw0I" },
          { nombre: "Rueda abdominal", series: "3", reps: "12-15", rir: "1", kg: "-", videoId: "ODRGMj5qEbY" },
        ],
      },
      {
        dia: 2,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto 1 pie c/m", series: "3", reps: "6-8", rir: "1", kg: "15 a 25k?", videoId: "s32cCgmRV3I" },
          { nombre: "Remo c/barra (prono)", series: "3", reps: "6-8", rir: "1", kg: "15 a 25k?", videoId: "C2IFzRirgyE" },
          { nombre: "Camilla cuadriceps 1 pie", series: "3", reps: "12-15", rir: "1", kg: "9 a 12l?", videoId: "RHOipBgmDvI" },
          { nombre: "Press con maquina", series: "3", reps: "8-10", rir: "1", kg: "4 a 10k?", videoId: "oKj8UYzpBAs" },
          { nombre: "Patada de gluteo c/polea c/banco inclinado", series: "3", reps: "10-12", rir: "1", kg: "?", videoId: "FX6B8--IOAI" },
          { nombre: "Elevaciones de pierna y cadera", series: "3", reps: "10-12", rir: "1", kg: "-", videoId: "xlpfYseoj5Y" },
        ],
      },
      {
        dia: 3,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Prensa tempo 5\"", series: "3", reps: "6-8", rir: "1", kg: "80 a 100k?", videoId: "qIXGEQBXTJc" },
          { nombre: "Rack Chins 2", series: "3", reps: "6-8", rir: "1", kg: "-", videoId: "ZsM_hW0C4nk" },
          { nombre: "Curl isquios 1-1/4", series: "3", reps: "8-10", rir: "1", kg: "4 a 6l?", videoId: "NK3I_r8_hNA" },
          { nombre: "Vuelos laterales tempo", series: "3", reps: "8-10", rir: "1", kg: "3 a 5Xl?", videoId: "WEHLCHncY5Y" },
          { nombre: "Crunch c/polea", series: "3", reps: "12-15", rir: "1", kg: "?", videoId: "fPMn_Sal32E" },
          { nombre: "Press katana", series: "3", reps: "12-15", rir: "1", kg: "?", videoId: "yI15XvFUVbM" },
        ],
      },
      {
        dia: 4,
        tipo: "FULL BODY",
        ejercicios: [
          { nombre: "Peso muerto rumano c/m", series: "4", reps: "8", rir: "-", kg: "10 a 20Xl?", videoId: "X9mz4c0yz3M" },
          { nombre: "Remo c/polea prono", series: "4", reps: "8", rir: "-", kg: "?", videoId: "Vm6E-2tq0bU" },
          { nombre: "Hip Thrust c/maquina", series: "4", reps: "10", rir: "--", kg: "20 a 40?", videoId: "Mrle3041xrY" },
          { nombre: "Serrucho", series: "4", reps: "10", rir: "-", kg: "7 a 12?", videoId: "xl1YiqQY2vA" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "12", rir: "-", kg: "?", videoId: "KRjONywfvs4" },
          { nombre: "Elevaciones de pierna", series: "3", reps: "12", rir: "-", kg: "-", videoId: "3cizD-Mg2II" },
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
          { nombre: "Prensa", series: "3", reps: "8-10", kg: "120", rir: 4, videoId: "W4vekQUkxsg" },
          { nombre: "Camilla cuadriceps 1 pie", series: "3", reps: "10-12", kg: "12 a 14L?", rir: 3, videoId: "RHOipBgmDvI" },
          { nombre: "Lagartijas", series: "3", reps: "6-8", kg: "4to?", rir: 4, videoId: "zP5Ce_AfXv8" },
          { nombre: "Press vertical c/mancuernas", series: "3", reps: "10-12", kg: "8xL?", rir: 3, videoId: "KoCLSi3Hvsw" },
          { nombre: "Plancha Copenhague", series: "3", reps: '25"', kg: "-", rir: 2, videoId: "WxSv8CELY5k" },
          { nombre: "Bicho muerto a 2 pies", series: "3", reps: "12", kg: "5K", rir: 2, videoId: "5WtBQleRYMg" },
        ],
      },
      {
        sesion: 2,
        ejercicios: [
          { nombre: "Peso muerto convencional", series: "3", reps: "8-10", kg: "50K?", rir: 4, videoId: "roi1lZP8Q0Q" },
          { nombre: "Camilla de femorales", series: "3", reps: "10-12", kg: "5L?", rir: 3, videoId: "B6t8MvbTtew" },
          { nombre: "Rack Chins 1", series: "3", reps: "8-10", kg: "7?", rir: 4, videoId: "bw9GdVFBvcQ" },
          { nombre: "Remo c/barra (prono)", series: "3", reps: "10-12", kg: "10 a 20K?", rir: 3, videoId: "C2IFzRirgyE" },
          { nombre: "Puente de gluteo unipodal", series: "3", reps: "17-20", kg: "10K?", rir: 2, videoId: "WUgSM6WF1fU" },
          { nombre: "Twist", series: "3", reps: "12-15", kg: "5K", rir: 2, videoId: "koedXVmNYrQ" },
        ],
      },
      {
        sesion: 3,
        ejercicios: [
          { nombre: "Sentadilla c/pausa", series: "3", reps: "8-10", kg: "30kG?", rir: 4, videoId: "RxPY_VWDk0w" },
          { nombre: "Estocadas", series: "3", reps: "10-12", kg: "15xL?", rir: 3, videoId: "4clFA-eafpc" },
          { nombre: "Press banca c/pausa", series: "3", reps: "8-10", kg: "12KG?", rir: 4, videoId: "gR8tfunTwN4" },
          { nombre: "Vuelos laterales c/m", series: "3", reps: "10-12", kg: "3 o 4KG?", rir: 3, videoId: "gBeIzdiagnQ" },
          { nombre: "Crunch c/brazos extendidos", series: "3", reps: "12", kg: "2.5", rir: 2, videoId: "NUMbnfEjMbE" },
          { nombre: "Press Pallof", series: "3", reps: '20"', kg: "-", rir: 2, videoId: "WxSv8CELY5k" },
        ],
      },
      {
        sesion: 4,
        ejercicios: [
          { nombre: "Rumano c/barra", series: "3", reps: "8-10", kg: "30KG", rir: 4, videoId: "fiDKXCSi8YA" },
          { nombre: "Hip Thrust c/maquina", series: "3", reps: "10-12", kg: "50KG?", rir: 3, videoId: "Mrle3041xrY" },
          { nombre: "Remo c/polea (neutro)", series: "3", reps: "8-10", kg: "?", rir: 4, videoId: "57alHtrimdg" },
          { nombre: "Jalón unilateral (arrodillado)", series: "3", reps: "10-12", kg: "?", rir: 3, videoId: "wYy32uk4Bu8" },
          { nombre: "Abducción c/banda acostada", series: "3", reps: "17-20", kg: "VERDE", rir: 2, videoId: "KRjONywfvs4" },
          { nombre: "Rueda abdominal", series: "3", reps: "12-15", kg: "-", rir: 2, videoId: "ODRGMj5qEbY" },
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
