import { EVIDENCIAS } from "./evidencias.js";

const navLinks = document.querySelectorAll(".nav-link");
const secciones = document.querySelectorAll(".seccion");

function escapeHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function rutaPdf(ruta) {
  const separador = ruta.lastIndexOf("/");
  if (separador === -1) return encodeURIComponent(ruta);
  return `${ruta.slice(0, separador + 1)}${encodeURIComponent(ruta.slice(separador + 1))}`;
}

function crearTarjetaEvidencia(practica) {
  const titulo = escapeHtml(practica.titulo);
  const archivo = escapeHtml(rutaPdf(practica.archivo));
  const descripcion = practica.descripcion
    ? `<p class="evidencia__descripcion">${escapeHtml(practica.descripcion)}</p>`
    : "";

  return `
    <article class="evidencia">
      <h3 class="evidencia__titulo">${titulo}</h3>
      ${descripcion}
      <iframe
        class="evidencia__visor"
        src="${archivo}"
        title="${titulo}"
        loading="lazy"
      ></iframe>
      <div class="evidencia__acciones">
        <a
          class="evidencia__enlace"
          href="${archivo}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir en nueva pestaña
        </a>
        <p class="evidencia__respaldo">
          Si no ves el documento arriba,
          <a class="evidencia__enlace" href="${archivo}" target="_blank" rel="noopener noreferrer">ábrelo directamente</a>.
        </p>
      </div>
    </article>
  `;
}

function renderEvidencias() {
  for (const [idSeccion, practicas] of Object.entries(EVIDENCIAS)) {
    const contenedor = document.getElementById(`contenido-${idSeccion}`);
    if (!contenedor) continue;

    if (!practicas.length) {
      contenedor.innerHTML =
        '<p class="evidencias-vacio">No hay evidencias registradas en esta sección.</p>';
      continue;
    }

    contenedor.innerHTML = practicas.map(crearTarjetaEvidencia).join("");
  }
}

function marcarNavActivo(idSeccion) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.section === idSeccion);
  });
}

function initNavegacionScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        marcarNavActivo(visible[0].target.id);
      }
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: [0, 0.1, 0.25],
    }
  );

  secciones.forEach((seccion) => observer.observe(seccion));

  const hash = location.hash.replace("#", "");
  if (hash) {
    marcarNavActivo(hash);
  }

  window.addEventListener("hashchange", () => {
    const id = location.hash.replace("#", "");
    if (id) marcarNavActivo(id);
  });
}

renderEvidencias();
initNavegacionScroll();
