let quantum = 4;
let tiempo_total = 0;
var tiempo_actual = 0;

//Definicion de clase como estructura de datos
class ProcesoRobin {

    constructor(id, tiempo_llegada, tiempo_ejecucion){
        this.id = id;
        this.tiempo_llegada = tiempo_llegada;
        this.tiempo_ejecucion = tiempo_ejecucion;
        this.tiempo_restante = tiempo_ejecucion;
    }

}

function executeRoundRobin(current_time){

    // Mostrar los resultados iniciales del algoritmo en la tabla
    const tableElement = document.getElementById("fcfs-table");
    tableElement.innerHTML = `
      <tr>
        <th>Seleccionar</th>
        <th>Proceso</th>
        <th>Tiempo de llegada</th>
        <th>Tiempo de ráfaga</th>
        <th>Tiempo restante</th>
        <th>STATUS</th>
        <th>Tiempo en ejecucion</th>
      </tr>
    `;

    let currentIndex = 0;
    const delay = 1000;

    function processTable() {
        if (currentIndex < n) {
          setTimeout(() => {
            const i = currentIndex;
            tableElement.innerHTML += `
            <tr>
              <td><input type="checkbox" name="process" value="${procesos[i].id}"></td>
              <td>${procesos[i].id}</td>
              <td>${procesos[i].tiempo_llegada}</td>
              <td>${procesos[i].tiempo_ejecucion}</td>
              <td id="remaining-time-${procesos[i].id}"></td>
              <td id="status-${procesos[i].id}"></td>
              <td id="execution-time-${procesos[i].id}"></td>
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
        if (currentIndex < n) {
          
            setTimeout(() => {
            
                const i = currentIndex;

                const remainingElement = document.getElementById(
                  `remaining-time-${procesos[i].id}`
                );
                
                const statusElement = document.getElementById(
                  `status-${procesos[i].id}`
                );
        
                let executionTime = 0;
                const executionElement = document.getElementById(
                  `execution-time-${procesos[i].id}`
                );

                const intervalId = setInterval(() => {
                  if(executionTime <= quantum && executionTime <= procesos[i].tiempo_ejecucion){
                      executionElement.textContent = executionTime + " segundos"; 
                      executionTime++;

                      //Actualizar el estado del proceso
                      if(executionTime <= procesos[i].tiempo_ejecucion){
                        statusElement.textContent = "Ejecutándose";
                        statusElement.style.backgroundColor = "rgba(22, 138, 6, 0.664)";
                      } else {
                        statusElement.textContent = "Terminado";
                      }
                  } else {
                      clearInterval(intervalId);
                      if(procesos[i].tiempo_ejecucion > 0){
                        if(procesos[i].tiempo_ejecucion <= quantum){
                            current_time += procesos[i].tiempo_ejecucion;
                            tiempo_total -= procesos[i].tiempo_ejecucion;
                            procesos[i].tiempo_ejecucion = 0;
                        } else {
                            current_time += quantum;
                            tiempo_total -= quantum;
                            procesos[i].tiempo_ejecucion -= quantum;
                        }
                      }
        
                      procesos[i].tiempo_restante = procesos[i].tiempo_ejecucion; 

                      remainingElement.textContent = procesos[i].tiempo_restante;
                      if(procesos[i].tiempo_restante > 0){
                        statusElement.textContent = "En espera";
                      } else {
                        statusElement.textContent = "Terminado";
                        statusElement.style.backgroundColor = "rgba(255, 72, 0, 0.753)";
                      }

                      if(currentIndex == (n-1)){ 
                
                          for(let j=0; j<n; j++){
                              if(procesos[i].tiempo_restante > 0){
                                  currentIndex = -1;
                              }
                          }
                  
                      }

                      currentIndex++;
                      calculateValues();

                    }

                  }, delay)

                }, delay);

              /*const completionElement = document.getElementById(
                `completion-time-${procesos[i].id}`
              );*/
      
              //remainingElement.textContent = procesos[i].tiempo_restante;
              //completionElement.textContent = elemento.tiempo_turnaround;
          
            };
      }

      const h2Element = document.getElementById('algoritmo');

        h2Element.innerHTML = 'Round Robin';

    //Creacion del arreglo de objetos simulando una estructura de datos.
    const procesos = [
        new ProcesoRobin(1, current_time + 1, 4),
        new ProcesoRobin(2, current_time + 3, 8),
        new ProcesoRobin(3, current_time + 5, 5),
        new ProcesoRobin(4, current_time + 7, 7),
        new ProcesoRobin(6, current_time + 8, 8)
    ];

    f = true;

    let n = procesos.length;   
    
    processTable();

    //Se imprime un mensaje en consola de que todos los procesos finalizaron su ejecucion.
    console.log("Todos los procesos han finalizado su ejecucion");

}

document.addEventListener("DOMContentLoaded", function() {
  returnNumberFromFile().then(function (current_time) {
    executeRoundRobin(current_time);
  })
})

           

