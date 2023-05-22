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

function executeRoundRobin(){

    // Mostrar los resultados iniciales del algoritmo en la tabla
    const tableElement = document.getElementById("fcfs-table");
    tableElement.innerHTML = `
      <tr>
        <th>Seleccionar</th>
        <th>Proceso</th>
        <th>Tiempo de llegada</th>
        <th>Tiempo de ráfaga</th>
        <th>Tiempo restante</th>
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

            if(procesos[i].tiempo_ejecucion > 0){
                if(procesos[i].tiempo_ejecucion <= quantum){
                    tiempo_actual += procesos[i].tiempo_ejecucion;
                    tiempo_total -= procesos[i].tiempo_ejecucion;
                    procesos[i].tiempo_ejecucion = 0;
                } else {
                    tiempo_actual += quantum;
                    tiempo_total -= quantum;
                    procesos[i].tiempo_ejecucion -= quantum;
                }
            }

            procesos[i].tiempo_restante = procesos[i].tiempo_ejecucion;
        
            const remainingElement = document.getElementById(
              `remaining-time-${procesos[i].id}`
            );

            /*const completionElement = document.getElementById(
              `completion-time-${procesos[i].id}`
            );*/
    
            remainingElement.textContent = procesos[i].tiempo_restante;
            //completionElement.textContent = elemento.tiempo_turnaround;
            
            currentIndex++;
            calculateValues();
          }, delay);
        }
      }

      const h2Element = document.getElementById('algoritmo');

        h2Element.innerHTML = 'Round Robin';

    //Creacion del arreglo de objetos simulando una estructura de datos.
    const procesos = [
        new ProcesoRobin(1, 1, 4),
        new ProcesoRobin(2, 3, 8),
        new ProcesoRobin(3, 5, 5),
        new ProcesoRobin(4, 7, 7),
        new ProcesoRobin(6, 8, 8)
    ];

    let n = procesos.length;   
    
    processTable();

    //Se imprime un mensaje en consola de que todos los procesos finalizaron su ejecucion.
    console.log("Todos los procesos han finalizado su ejecucion");

}

executeRoundRobin();
           

