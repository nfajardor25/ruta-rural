# Ruta Rural · Repaso de enfermería para el rural

App web instalable (PWA) para repasar enfermería antes del rural, con **Clara**, una enfermera asistente animada.

## Qué incluye (versión 1)
- Bienvenida que pregunta tu nombre **una sola vez**; luego Clara te saluda como "jefe [nombre]". El nombre se cambia en **Ajustes**.
- Tarjetas con **repetición espaciada** (estilo SM-2): las difíciles vuelven antes, las fáciles después.
- **Juegos** generados al azar: balance de líquidos y cálculo de goteo.
- **Casos del rural** narrados por Clara en formato chat, con plantillas que cambian persona, vereda, signos y laboratorios para que no se repitan.
- **Calendario de racha**, módulos de énfasis y el pensum completo por periodos.
- **Videos** con búsquedas guiadas y canales, en su mayoría en español.
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
data/contenido.js     Módulos, pensum y tarjetas (con fuente sugerida)
data/casos.js         Generadores de casos y juegos
data/videos.js        Videos y canales
sw.js                 Funcionamiento sin internet y actualizaciones
manifest.webmanifest  Datos para instalar la app
icons/                Íconos de la app
```

## Aviso
Herramienta de repaso. Cada tarjeta indica su fuente sugerida: valida siempre con la guía vigente del Ministerio de Salud, el protocolo de tu institución y tus docentes.
