$(window).on("load", function () {
  // Animación de carga
  setTimeout(function () {
    $("#loading-screen").fadeOut("slow", function () {
      $(this).remove(); // Eliminar completamente la pantalla de carga del DOM
      $("#login-screen").fadeIn("slow");
    });
  }, 3000); // Cambiar a la duración deseada de la animación de carga
});
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe y la página se recargue

    var passwordInput = document.getElementById("password");
    var password = passwordInput.value;

    // Verificar la contraseña
    if (password === "666") {
      // Animación de fade y redirección
      $("#login-screen").fadeOut("slow", function () {
        window.location.href = "PF.html";
      });
    } else {
      // Mostrar mensaje de error
      var errorMessage = document.getElementById("error-message");
      errorMessage.textContent = "Contraseña incorrecta";
      errorMessage.style.display = "block";
    }
  });
