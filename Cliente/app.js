const listaPlatillos = [];

// DOM
const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombrePlatillo');
const precio = document.getElementById('precioPlatillo');
const descripcion = document.getElementById('descripcionPlatillo');

const textoError = document.getElementById('textoError');
const btnAgregar = document.getElementById('btnAgregarPlatillo');
const btnLimpiarForm = document.getElementById('btnLimpiarFormulario');
const btnLimpiarLista = document.getElementById('btnLimpiarLista');

const lista = document.getElementById('listaPlatillos');
const textoVacio = document.getElementById('textoVacio');

// Utilidad
const normalizar = texto => texto.trim().replace(/\s+/g, ' ');

// Validación reactiva
function validar() {
    let error = '';

    if (normalizar(nombre.value).length < 3) {
        error = 'El nombre debe tener al menos 3 caracteres.';
    } else if (!precio.value || precio.value <= 0) {
        error = 'El precio debe ser mayor a 0.';
    }

    textoError.textContent = error;
    btnAgregar.disabled = Boolean(error);

    return !error;
}

// Render
function pintar() {
    lista.innerHTML = '';
    textoVacio.style.display = listaPlatillos.length ? 'none' : 'block';

    listaPlatillos.forEach(platillo => {
        const li = document.createElement('li');
        li.textContent = `${platillo.nombre} - $${platillo.precio}`;

        if (platillo.descripcion) {
            const p = document.createElement('p');
            p.textContent = platillo.descripcion;
            li.appendChild(p);
        }

        lista.appendChild(li);
    });
}

// Limpiar formulario
function limpiarFormulario() {
    nombre.value = '';
    precio.value = '';
    descripcion.value = '';
    textoError.textContent = '';
    btnAgregar.disabled = true;
    nombre.focus();
}

// Limpiar lista
function limpiarLista() {
    listaPlatillos.length = 0;
    pintar();
}

// Eventos
nombre.addEventListener('input', validar);
precio.addEventListener('input', validar);

btnLimpiarForm.addEventListener('click', limpiarFormulario);
btnLimpiarLista.addEventListener('click', limpiarLista);

formulario.addEventListener('submit', e => {
    e.preventDefault();
    if (!validar()) return;

    listaPlatillos.push({
        nombre: normalizar(nombre.value),
        precio: Number(precio.value),
        descripcion: normalizar(descripcion.value)
    });

    limpiarFormulario();
    pintar();
});

// Init
validar();
pintar();