# Portafolio de evidencias — Gestión de la Inovación

Sitio estático de una sola página (scroll continuo) para presentar las prácticas de la materia. El menú del header lleva a cada sección con desplazamiento suave. Listo para desplegarse en [Vercel](https://vercel.com) sin proceso de build.

## Logo de la UABC

El escudo está en `img/Escudo_0_0.png` y se muestra a la izquierda de los datos institucionales en la portada (`index.html`, bloque `.portada__encabezado`).

## Estructura

```
├── index.html          # Portada y secciones
├── css/styles.css      # Estilos
├── js/
│   ├── main.js         # Navegación por pestañas y renderizado
│   └── evidencias.js   # Listado de PDFs por unidad
└── pdfs/
    ├── unidad-1/
    ├── unidad-2/
    ├── unidad-3/
    └── proyecto/
```

## Agregar o cambiar PDFs

1. Copia cada PDF en la carpeta correspondiente bajo `pdfs/`.
2. Edita `js/evidencias.js` para que cada entrada coincida con el archivo:

```javascript
{
  titulo: "Práctica 1 — Nombre descriptivo",
  archivo: "pdfs/unidad-1/mi-archivo.pdf",
  descripcion: "Opcional",
}
```

3. Puedes agregar o quitar objetos en los arreglos de cada unidad; el sitio los muestra automáticamente con visor embebido y enlace para abrir en nueva pestaña.

Los nombres de archivo en `js/evidencias.js` deben coincidir exactamente con los PDF en cada carpeta (incluyendo espacios y acentos). Si renombras un archivo, actualiza también `evidencias.js`.

## Vista local

Los módulos ES requieren un servidor local (no basta abrir `index.html` como archivo):

```bash
npx serve .
```

Abre la URL que indique el comando (por ejemplo `http://localhost:3000`).

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En Vercel: **Add New Project** → importa el repo.
3. Framework Preset: **Other**.
4. Build Command: vacío. Output Directory: `.` (raíz).
5. Deploy.

Cada push a la rama principal vuelve a publicar el sitio. Mantén el tamaño total del repo razonable si incluyes muchos PDFs.

## Secciones

| Pestaña   | Contenido                          |
|-----------|------------------------------------|
| Inicio    | Portada institucional              |
| Unidad 1–3| PDFs de prácticas por unidad       |
| Proyecto  | Documento(s) del proyecto final    |
