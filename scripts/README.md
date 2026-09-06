# Scripts

## fill-videos.js — Agregar videos de YouTube automáticamente

**No necesita API key ni tarjeta de crédito.**
Usa el endpoint público de búsqueda de YouTube.

### Uso

```bash
# En la carpeta del proyecto (lauren-fitness)
node scripts/fill-videos.js
```

Espera unos minutos mientras busca ~70 ejercicios.
Al terminar, subí los cambios:

```bash
git add src/data/workoutData.js
git commit -m "feat: videos de YouTube agregados"
git push
```

Vercel redesployará automáticamente.

### Si algo sale mal

El script guarda backup automático en `src/data/workoutData.js.backup`.
Para revertir:
```bash
cp src/data/workoutData.js.backup src/data/workoutData.js
```
