// Cierra los menús desplegables si están abiertos
$(document).on("click", function (e) {
  $(".dropdown-menu").removeClass("show");
});

// Evita el cierre del menú si se hace clic dentro del menú mismo
$(".dropdown-toggle").on("click", function (e) {
  e.stopPropagation();
});
//Quitar opciones si se necesita
$(document).ready(function () {
  $(".dropdown-toggle").on("click", function () {
    var target = $(this).next(".dropdown-menu");
    $(".dropdown-menu").not(target).removeClass("show");
    target.toggleClass("show");
  });
});

//Reloj
// Función para formatear números menores a 10 con un cero al inicio
function formatNumber(number) {
  return number < 10 ? "0" + number : number;
}

// Función para obtener la hora actual y actualizar el reloj
function updateClock() {
  var now = new Date();
  var hours = formatNumber(now.getHours());
  var minutes = formatNumber(now.getMinutes());
  var ampm = hours >= 12 ? "p.m." : "a.m.";

  document.getElementById("clock").textContent =
    hours + ":" + minutes + " " + ampm;

  setTimeout(updateClock, 1000); // Actualizar cada segundo
}

// Función para obtener la fecha actual y actualizarla
function updateDate() {
  var now = new Date();
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var dateStr = now.toLocaleDateString("en-US", options);

  document.getElementById("date").textContent = dateStr;
}

// Iniciar la actualización del reloj y la fecha al cargar la página
$(document).ready(function () {
  updateClock();
  updateDate();
});

//Contador
// Contador (cronómetro)
var timerElement = document.getElementById("timer");
var seconds = 0;
var interval;

function startTimer() {
  interval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function updateTimer() {
  seconds++;
  timerElement.textContent = seconds;
}
function readNumberFromFile() {
  // Ruta del archivo
  var filePath = "files/tiempo-actual.txt";

  // Lee el archivo mediante una solicitud AJAX
  var xhr = new XMLHttpRequest();
  xhr.open("GET", filePath, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // Archivo encontrado, se lee el contenido
        var number = parseInt(xhr.responseText);

        if (isNaN(number)) {
          // El contenido no es un número válido
          console.error("El contenido del archivo no es un número válido");
        } else {
          // Se encontró un número válido en el archivo
          seconds = number;
          timerElement.textContent = seconds;
        }
      } else {
        // El archivo no pudo ser encontrado
        console.error("El archivo no se encuentra o no se puede acceder");
      }
    }

    // Iniciar el contador en 0 segundos si el archivo no se encuentra o hay un error
    if (xhr.status !== 200 || isNaN(number)) {
      seconds = 0;
      timerElement.textContent = seconds;
    }
  };

  xhr.send();

  // Iniciar el cronómetro después de verificar el archivo
  startTimer();

}
// Iniciar el contador cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
  readNumberFromFile();
});
