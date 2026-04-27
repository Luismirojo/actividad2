// VARIABLES Y DATOS INICIALES

// Arrays que almacenan los destinos, imágenes y precios
const destinos = ["Roma", "París", "Londres", "Tokio", "Nueva York", "Sídney"];
const imagenes = [
    "imagen/roma.jpg",
    "imagen/paris.jpg",
    "imagen/londres.jpg",
    "imagen/tokio.jpg",
    "imagen/nueva_york.jpg",
    "imagen/sydney.jpg"
];
const precios = [850, 920, 780, 1300, 1150, 1450];

// Variables para el índice del carrusel
let indice = 0;


// FUNCIONES DEL CARRUSEL

// Muestra el destino actual
function mostrarDestino() {
    document.getElementById("imagenDestino").src = imagenes[indice];
    document.getElementById("nombreDestino").textContent = destinos[indice];
    document.getElementById("precioDestino").textContent = `Precio: ${precios[indice]} €`;
    document.getElementById("contadorDestino").textContent = `Destino ${indice + 1} de ${destinos.length}`;
}

// Cambia al destino anterior
function anteriorDestino() {
    indice = (indice - 1 + destinos.length) % destinos.length;
    mostrarDestino();
}

// Cambia al destino siguiente
function siguienteDestino() {
    indice = (indice + 1) % destinos.length;
    mostrarDestino();
}


// FUNCIÓN PRINCIPAL DEL SORTEO

function realizarSorteo(nombre) {
    // Recupera el número de visitas guardado en localStorage o lo inicia a 0
    let visitas = localStorage.getItem("numVisitas") ? parseInt(localStorage.getItem("numVisitas")) : 0;

    // Incrementa el número de visitas
    visitas++;
    localStorage.setItem("numVisitas", visitas);

    // Genera un número aleatorio entre 1 y el número de visitas
    const aleatorio = Math.floor(Math.random() * visitas) + 1;

    const resultado = document.getElementById("resultadoSorteo");

    // Comprueba si gana el sorteo
    if (visitas > 1000 && aleatorio === visitas) {
        const precioOriginal = precios[indice];
        const precioConDescuento = (precioOriginal * 0.85).toFixed(2);
        resultado.textContent = `¡Enhorabuena ${nombre}! Has ganado un 15% de descuento en tu viaje a ${destinos[indice]}. Precio original: ${precioOriginal} € — Precio final: ${precioConDescuento} €`;
        resultado.style.color = "green";
    } else {
        resultado.textContent = `Lo sentimos ${nombre}, esta vez no has tenido premio. ¡Sigue viajando con nosotros!`;
        resultado.style.color = "red";
    }
}


// GESTIÓN DE LA INTERACCIÓN INICIAL

document.getElementById("btnAceptar").addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value.trim();
    if (nombre === "") {
        alert("Por favor, introduce tu nombre.");
        return;
    }

    // Muestra mensaje de bienvenida personalizado
    document.getElementById("bienvenida").textContent = `¡Bienvenid@, ${nombre}!`;
    document.getElementById("nombreUsuarioContainer").classList.add("oculto");

    // Muestra el contenido principal
    document.getElementById("contenido").classList.remove("oculto");

    // Inicializa el carrusel
    mostrarDestino();

    // Ejecuta el sorteo
    realizarSorteo(nombre);
});

// Eventos para los botones del carrusel
document.getElementById("anterior").addEventListener("click", anteriorDestino);
document.getElementById("siguiente").addEventListener("click", siguienteDestino);
