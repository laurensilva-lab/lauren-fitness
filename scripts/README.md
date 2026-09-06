# Scripts

## fill-videos.js — Agregar videos de YouTube automáticamente

### Paso 1 — Conseguir la API Key (gratis, 5 minutos)

1. Ir a https://console.cloud.google.com
2. Crear un proyecto nuevo (ej: "lauren-fitness")
3. Ir a **APIs y Servicios → Biblioteca**
4. Buscar **"YouTube Data API v3"** → Habilitar
5. Ir a **APIs y Servicios → Credenciales**
6. Click **Crear credenciales → Clave de API**
7. Copiar la key generada

> La cuota gratuita es **10.000 unidades/día**.
> Cada búsqueda usa 100 unidades → podés hacer 100 búsquedas gratis por día.
> El script busca ~70 ejercicios, así que entra bien dentro de la cuota.

### Paso 2 — Correr el script

```bash
# En la carpeta del proyecto
node scripts/fill-videos.js TU_API_KEY_AQUI
```

### Paso 3 — Subir a GitHub

```bash
git add src/data/workoutData.js
git commit -m "feat: videos de YouTube agregados"
git push
```

Vercel va a redesployar automáticamente con los videos.

### Si algo salió mal

El script guarda un backup en `src/data/workoutData.js.backup`.
Para revertir: `cp src/data/workoutData.js.backup src/data/workoutData.js`
