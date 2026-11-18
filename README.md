# Para mi Marilinda 💛

Web de recuerdos para Miguel y Mari. Construida con React + Vite; compatible con GitHub Pages. Incluye el módulo de Valorant con los perfiles, peak ranks y agentes principales.

## Ejecutar en tu PC

Necesitas Node.js 20 o superior.

```bash
npm install
npm run dev
```

Abre la dirección local que muestre Vite.

## Editar recuerdos

Edita **`src/data/content.json`** para cambiar textos, cartas, canciones, línea de tiempo, galería y planes futuros. Los perfiles de Valorant están en **`src/data/valorant.json`**.

Para fotos y videos, coloca archivos en `public/media/` y usa rutas como `media/foto1.jpg` o `media/clip1.mp4` en el JSON. Las propiedades `image` y `src` vacías muestran un marcador de posición. Usa formatos JPG, PNG, WebP, MP4 o WebM. Para una canción, pega un enlace autorizado de Spotify o YouTube en `url` (abre en otra pestaña). Las canciones no se reproducen automáticamente.

Para mostrar el contador, escribe una fecha real en `startDate` usando `AAAA-MM-DD`; si está vacío se muestra un mensaje sin contador. **No se han inventado fechas ni recuerdos reales.**

Para añadir más entradas, duplica objetos dentro de los arrays `timeline`, `gallery`, `letters` o `songs`, usando un `id` distinto. Mantén las comillas, comas y corchetes válidos de JSON.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube los archivos de este proyecto.
2. En GitHub: Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. El workflow incluido compila y publica el sitio al hacer push a `main`.
4. Visita la URL indicada en la sección Pages cuando termine el despliegue.

El `base: './'` en Vite permite servir los recursos desde la ruta del repositorio.

## Privacidad

**GitHub Pages publica un sitio accesible públicamente**. No subas fotos, mensajes, videos o datos privados sin el consentimiento de quienes aparecen. Un repositorio privado no convierte GitHub Pages en una página con acceso restringido. Para un álbum privado y un panel de administración real, sería necesaria otra arquitectura con autenticación y almacenamiento privado.

## Valorant

Los enlaces de Tracker.gg abren perfiles externos. Peak rank y main agent son valores editables manualmente; no se realiza scraping ni sincronización automática. Los retratos de Phoenix y Clove se cargan desde Valorant-API (servicio comunitario externo).

## Importante sobre privacidad

GitHub Pages es público. No subas fotos privadas, cartas íntimas o información sensible sin permiso. Para contenido privado se requiere almacenamiento y acceso autenticado fuera del repositorio público.
