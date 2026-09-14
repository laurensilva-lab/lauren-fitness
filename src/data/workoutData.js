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
  {
    mes: 5,
    nombre: "MES 5",
    objetivo: "Fuerza + Hipertrofia",
    duracion: "8 semanas",
    inicio: "Finales de Abril",
    dias: [

    ],
  },
  {
    mes: 4,
    nombre: "MES 4",
    objetivo: "Fuerza + Hipertrofia",
    duracion: "4 semanas",
    inicio: "Finales de Marzo",
    dias: [

    ],
  },
  {
    mes: 3,
    nombre: "MES 3",
    objetivo: "Fuerza + Hipertrofia",
    duracion: "8 semanas",
    inicio: "Marzo",
    dias: [

    ],
  },
  {
    mes: 2,
    nombre: "MES 2",
    objetivo: "Adaptación anatómica y técnica",
    duracion: "8 semanas",
    inicio: "Febrero",
    dias: [

    ],
  },
  {
    mes: 1,
    nombre: "MES 1",
    objetivo: "Adaptación anatómica y técnica",
    duracion: "8 semanas",
    inicio: "Diciembre",
    dias: [

    ],
  }
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
