# Ruta Rural · Repaso de enfermería para el rural

App web instalable (PWA) para repasar enfermería antes del rural, con **Clara**, una enfermera asistente animada.

## Qué incluye (versión 1.1)
- Bienvenida que pregunta tu nombre **una sola vez**; luego Clara te saluda como "jefe [nombre]". El nombre se cambia en **Ajustes**.
- **28 materias** del pensum (las que sirven para el rural), cada una con al menos **20 tarjetas**, **20 juegos** y **videos de YouTube**.
- Tarjetas con **repetición espaciada** (estilo SM-2): las difíciles vuelven antes, las fáciles después. Hasta 20 tarjetas nuevas al día.
- **Juegos** por materia (opción múltiple, verdadero o falso, parejas, ordenar pasos), reto mixto y **14 calculadoras** con ejercicios al azar
  (balance, goteo, dosis, acetaminofén, IMC, PAM, gases, SRO, Parkland, FPP, incidencia, pruebas diagnósticas, media y Glasgow).
- **Casos del rural** narrados por Clara en formato chat, con plantillas que cambian persona, vereda, signos y laboratorios para que no se repitan.
- **Calendario de racha**, énfasis para el rural (planificación familiar, procedimientos, HTA, balance, electrolitos) y puntajes guardados.
- Funciona **sin internet** después de la primera carga.

## Cómo se actualiza
La app vive en GitHub Pages. Cada vez que se sube un cambio a este repositorio:
1. Se cambia `VERSION` en `sw.js`.
2. El celular detecta la versión nueva y Clara muestra "Hay una versión nueva · Actualizar".

El APK generado con PWABuilder es un "envoltorio" que abre esta misma página, así que **también se actualiza solo**. Solo hay que generar un APK nuevo si cambian el nombre, el ícono o la dirección web de la app.

## Estructura
```
index.html            Página principal
styles.css            Estilos (paleta pastel)
app.js                Lógica: pantallas, racha, repetición espaciada, Clara
data/materias.js      Registro de materias y énfasis, y ayudas C() y G() para cargar contenido
data/base.js          Tarjetas de la versión 1 (conservan su id para no perder el progreso)
data/p1.js … p6_8.js  Tarjetas y juegos de cada periodo
data/casos.js         Casos del rural y calculadoras
data/videos.js        Videos por materia, búsquedas guiadas y canales
sw.js                 Funcionamiento sin internet y actualizaciones
manifest.webmanifest  Datos para instalar la app
icons/                Íconos de la app
```

## Cómo agregar contenido
- Tarjetas: agrega filas **al final** de la lista `C('materia', [...])` del archivo del periodo. Así no se mueve el progreso guardado.
- Juegos: agrega filas a `G('materia', [...])` con el formato explicado al inicio de `data/materias.js`.
- Después de cualquier cambio, sube la versión en `sw.js` y en `app.js`.

## Aviso
Herramienta de repaso. Cada tarjeta indica su fuente sugerida: valida siempre con la guía vigente del Ministerio de Salud, el protocolo de tu institución y tus docentes.
