// ===== ESTADO =====
let canciones = [];
let editandoIndex = null;

// ===== ELEMENTOS =====
const form = document.getElementById("formularioCancion");
const tituloInput = document.getElementById("titulo");
const artistaInput = document.getElementById("artista");
const btnGuardar = document.getElementById("btnGuardar");
const lista = document.getElementById("listaCanciones");
const mensaje = document.getElementById("mensaje");
const error = document.getElementById("textoError");
const textoVacio = document.getElementById("textoVacio");

// ===== VALIDACIÓN =====
function validarFormulario() {
  if (tituloInput.value.trim().length >= 3 &&
      artistaInput.value.trim().length > 0) {
    btnGuardar.disabled = false;
    error.textContent = "";
  } else {
    btnGuardar.disabled = true;
  }
}

tituloInput.addEventListener("input", validarFormulario);
artistaInput.addEventListener("input", validarFormulario);

// ===== SUBMIT =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = tituloInput.value.trim();
  const artista = artistaInput.value.trim();

  if (btnGuardar.disabled) return;

  if (editandoIndex === null) {
    // CREATE
    canciones.push({ titulo, artista });
    mensaje.textContent = "Canción agregada 🎵";
  } else {
    // UPDATE
    canciones[editandoIndex] = { titulo, artista };
    mensaje.textContent = "Canción actualizada ✏️";
    editandoIndex = null;
  }

  form.reset();
  btnGuardar.disabled = true;
  renderizar();
});

// ===== RENDER =====
function renderizar() {
  lista.innerHTML = "";

  if (canciones.length === 0) {
    textoVacio.style.display = "block";
    return;
  }

  textoVacio.style.display = "none";

  canciones.forEach((cancion, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${cancion.titulo}</strong> - ${cancion.artista}
      <button data-editar>Editar</button>
      <button data-eliminar>Eliminar</button>
    `;

    li.querySelector("[data-editar]").onclick = () => editar(index);
    li.querySelector("[data-eliminar]").onclick = () => eliminar(index);

    lista.appendChild(li);
  });
}

// ===== EDITAR =====
function editar(index) {
  const cancion = canciones[index];
  tituloInput.value = cancion.titulo;
  artistaInput.value = cancion.artista;
  editandoIndex = index;
  btnGuardar.disabled = false;
  mensaje.textContent = "Editando canción...";
}

// ===== ELIMINAR =====
function eliminar(index) {
  if (confirm("¿Eliminar esta canción?")) {
    canciones.splice(index, 1);
    renderizar();
  }
}
