# Sincronización automática con Google Sheets

## Configuración (una sola vez)

### Paso 1 — Hacer la Sheet pública
1. Abrí la Google Sheet del coach
2. **Compartir** → **Cualquier persona con el enlace** → **Viewer**
3. Copiá el ID de la URL (la parte entre `/d/` y `/edit`)
   Ejemplo: `https://docs.google.com/spreadsheets/d/**ESTE_ID**/edit`

### Paso 2 — Agregar el ID como secreto en GitHub
1. Ir a: `github.com/laurensilva-lab/lauren-fitness`
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret**
   - Name: `GOOGLE_SHEET_ID`
   - Value: el ID copiado en el paso 1
4. **Add secret**

### Paso 3 — Listo
- La app se sincroniza automáticamente **todos los días a las 11am (Argentina)**
- También podés sincronizar manualmente:
  GitHub → **Actions** → **Sincronizar Google Sheets** → **Run workflow**

## ¿Qué sincroniza?
- Ejercicios, series, reps, RIR y peso recomendado de los 5 meses
- Los videos (videoId) se preservan aunque cambien los ejercicios
- Si el coach agrega ejercicios nuevos, aparecen sin videoId hasta que se asignen

## Tiempo de actualización
1. Coach guarda en Google Sheets
2. Corre el workflow (~1 min)
3. Vercel detecta el push y redesploya (~2 min)
4. **App actualizada en ~3 minutos** ✅
