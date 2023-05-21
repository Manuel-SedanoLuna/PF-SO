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

// Iniciar el contador cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
  startTimer();
});
