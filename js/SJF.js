//Definción de la estructura de datos
class ProcesoSJF {

    constructor(id, tiempo_llegada, tiempo_burst){
        this.id = id;
        this.tiempo_llegada = tiempo_llegada;
        this.tiempo_burst = tiempo_burst;
        this.tiempo_completado = 0;
    }

}

//Función para comparar y ordenar los procesos por su tiempo de burst
function comparar_tiempo_burst(a, b){

    return a.tiempo_burst - b.tiempo_burst;
}

function executeSJF(current_time){

    //Mostrar los resultados iniciales del algoritmo
    const tableElement = document.getElementById("fcfs-table");
    tableElement.innerHTML = `
      <tr>
        <th>Seleccionar</th>
        <th>Proceso</th>
        <th>Tiempo de llegada</th>
        <th>Tiempo de ráfaga</th>
        <th>Tiempo completado</th>
        <th>STATUS</th>
        <th>Tiempo en ejecución</th>
      </tr>
    `;

    let currentIndex = 0;
    const delay = 1000;

    function processTable() {
        if(currentIndex < n) {
            setTimeout(() => {
                const i = currentIndex;
                tableElement.innerHTML += `
                <tr id="process-row-${procesos[i].id}">
                  <td><input type="checkbox" name="process" value="${procesos[i].id}"></td>
                  <td>${procesos[i].id}</td>
                  <td>${procesos[i].tiempo_llegada}</td>
                  <td>${procesos[i].tiempo_burst}</td>
                  <td id="completion-time-${procesos[i].id}"></td>
                  <td id="status-${procesos[i].id}">En espera</td>
                  <td id="execution-time-${procesos[i].id}">0 segundos</td>
                </tr>
              `;
               currentIndex++;
               processTable();
            }, delay);
        } else {
            currentIndex = 0;
            calculateValues();
        }
    }

    function calculateValues() {
        if(currentIndex < n){
            setTimeout(() => {
                const i = currentIndex;
                
                const completionElement = document.getElementById(
                    `completion-time-${procesos[i].id}`
                );

                const statusElement = document.getElementById(
                    `status-${procesos[i].id}`
                );

                let executionTime = 0;
                const executionElement = document.getElementById(
                    `execution-time-${procesos[i].id}`
                );

                const intervalId = setInterval(() => {
                    if(executionTime <= procesos[i].tiempo_burst){
                        executionElement.textContent = executionTime + " segundos";
                        executionTime++;

                        //Actualizar el estado del proceso
                        if(executionTime <= procesos[i].tiempo_burst){
                            statusElement.textContent = "Ejecutándose";
                            statusElement.style.backgroundColor = "rgba(22, 138, 6, 0.664)";
                        } else {
                            statusElement.textContent = "Terminado";
                        }
                    } else {
                        clearInterval(intervalId);
                        current_time += procesos[i].tiempo_burst;
                        procesos[i].tiempo_completado = current_time;

                        completionElement.textContent = procesos[i].tiempo_completado;

                        statusElement.textContent = "Terminado";
                        statusElement.style.backgroundColor = "rgba(255, 72, 0, 0.753)";
                        currentIndex++;
                        calculateValues();

                         // Eliminar la fila de la tabla después de 4 segundos
                        setTimeout(() => {
                            const rowElement = document.getElementById(
                            `process-row-${procesos[i].id}`
                            );
                            rowElement.parentNode.removeChild(rowElement);
                        }, 15000);
                    }
                }, delay);

            }, delay);
        }
    }

    const h2Element = document.getElementById("algoritmo");

    h2Element.innerHTML = "Shortest Job First";

    const procesos = [
        new ProcesoSJF(0, current_time + 1, 4),
        new ProcesoSJF(1, current_time + 3, 5),
        new ProcesoSJF(3, current_time + 4, 5),
        new ProcesoSJF(5, current_time + 5, 7),
        new ProcesoSJF(6, current_time + 6, 4)
    ];

    let n = procesos.length;

    procesos.sort(comparar_tiempo_burst);

    processTable();

}

document.addEventListener("DOMContentLoaded", function() {
    returnNumberFromFile().then(function (current_time) {
        executeSJF(current_time);
  
    }
    )
  }
  )



