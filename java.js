// ---------------------------------------------------
// Acá guardamos las palabras peligrosas que vamos a buscar
// ---------------------------------------------------
var firmasMalas = ["ransomware", "encrypt", "stealpasswords", "document.cookie", "keylogger", "eval(", "backdoor"];

// Esta variable guarda las palabras malas que se encontraron
var encontradas = [];

// ---------------------------------------------------
// Función que se ejecuta al apretar "Iniciar Escaneo"
// ---------------------------------------------------
function escanear() {

  // Guardamos lo que el usuario escribió en una variable
  var cajaTexto = document.getElementById("codigo");
  var texto = cajaTexto.value;

  // Pasamos el texto a minúsculas para que no importe si
  // escribieron "RANSOMWARE" o "ransomware"
  texto = texto.toLowerCase();

  // Vaciamos la lista de palabras encontradas antes de empezar
  encontradas = [];

  // Recorremos una por una las palabras de la lista de firmas malas
  for (var i = 0; i < firmasMalas.length; i++) {

    var palabra = firmasMalas[i];

    // Preguntamos si esa palabra está adentro del texto
    if (texto.includes(palabra) == true) {
      // Si está, la guardamos en la lista de encontradas
      encontradas.push(palabra);
    }
  }

  // Buscamos en el HTML el cartel donde mostramos el resultado
  var cartelEstado = document.getElementById("estado");
  var botonCuarentena = document.getElementById("btnCuarentena");

  // Si la lista de encontradas tiene al menos 1 palabra, hay peligro
  if (encontradas.length > 0) {

    // Armamos el texto con las palabras encontradas, una por una
    var textoFirmas = "";
    for (var j = 0; j < encontradas.length; j++) {
      textoFirmas = textoFirmas + encontradas[j];
      // Si no es la última, le agregamos una coma
      if (j < encontradas.length - 1) {
        textoFirmas = textoFirmas + ", ";
      }
    }

    cartelEstado.className = "rojo";
    cartelEstado.innerHTML = "⚠️ ¡ALERTA! Código peligroso. Se encontró: " + textoFirmas;
    botonCuarentena.disabled = false;

  } else {
    // Si no se encontró nada, el código está limpio
    cartelEstado.className = "verde";
    cartelEstado.innerHTML = "✅ Código seguro. No se encontraron amenazas.";
    botonCuarentena.disabled = true;
  }
}

// ---------------------------------------------------
// Función que se ejecuta al apretar "Enviar a Cuarentena"
// ---------------------------------------------------
function enviarCuarentena() {

  // Borramos lo que había en la caja de texto
  var cajaTexto = document.getElementById("codigo");
  cajaTexto.value = "";

  // Guardamos la hora actual
  var horaActual = new Date().toLocaleTimeString();

  // Armamos el texto con las palabras que se pusieron en cuarentena
  var textoFirmas = "";
  for (var j = 0; j < encontradas.length; j++) {
    textoFirmas = textoFirmas + encontradas[j];
    if (j < encontradas.length - 1) {
      textoFirmas = textoFirmas + ", ";
    }
  }

  // Creamos un nuevo elemento de lista (li) para el registro
  var nuevoRegistro = document.createElement("li");
  nuevoRegistro.innerHTML = "[" + horaActual + "] Código enviado a cuarentena. Firmas: " + textoFirmas;

  // Lo agregamos a la lista que está en el HTML
  var lista = document.getElementById("lista");
  lista.appendChild(nuevoRegistro);

  // Dejamos todo como al principio
  var cartelEstado = document.getElementById("estado");
  cartelEstado.className = "";
  cartelEstado.innerHTML = "Amenaza aislada en cuarentena.";

  var botonCuarentena = document.getElementById("btnCuarentena");
  botonCuarentena.disabled = true;
}