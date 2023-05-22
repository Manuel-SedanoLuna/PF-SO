let MAX_QUEUE_SIZE = 10;

let tiempoActual = 0;

// Definimos una clase "Queue"
class Queue {
    constructor() {
      this.elements = [];
      this.front = -1;
      this.rear = -1;
    }
  
    enqueue(element) {
      if (this.rear === MAX_QUEUE_SIZE - 1) {
        console.log(`La cola está llena. No se puede encolar el elemento: ${element}`);
      } else {
        this.rear++;
        this.elements[this.rear] = element;
        console.log(`Elemento encolado: ${element}`);
      }
    }
  
    dequeue() {
      if (this.front === this.rear) {
        console.log("La cola está vacía. No se puede desencolar ningún elemento.");
      } else {
        this.front++;
        const element = this.elements[this.front];
        console.log(`Elemento desencolado: ${element}`);
        return element;
      }
    }

    getLength(){
      return this.elements.length;
    }
  }

  class ProcesoFIFO {

    constructor(id, tiempo_llegada, tiempo_burst) {
      this.id = id;
      this.tiempo_llegada = tiempo_llegada;
      this.tiempo_burst = tiempo_burst;
      this.tiempo_completado = 0;
      this.tiempo_turnaround = 0;
      this.tiempo_espera = 0;
    }

  }

  function executeFIFO() {
    const queue = new Queue();

    // Mostrar los resultados iniciales del algoritmo en la tabla
    const tableElement = document.getElementById("fcfs-table");
    tableElement.innerHTML = `
      <tr>
        <th>Seleccionar</th>
        <th>Proceso</th>
        <th>Tiempo de llegada</th>
        <th>Tiempo de ráfaga</th>
        <th>Tiempo completado</th>
        <th>Tiempo de turnaround</th>
        <th>Tiempo de espera</th>
      </tr>
    `;

    let currentIndex = 0;
    const delay = 1000;

    function processTable() {
      if (currentIndex < n) {
        setTimeout(() => {
          const i = currentIndex;
          const elemento = queue.dequeue();
          tableElement.innerHTML += `
          <tr>
            <td><input type="checkbox" name="process" value="${elemento.id}"></td>
            <td>${elemento.id}</td>
            <td>${elemento.tiempo_llegada}</td>
            <td>${elemento.tiempo_burst}</td>
            <td id="completion-time-${elemento.id}"></td>
            <td id="turnaround-time-${elemento.id}"></td>
            <td id="waiting-time-${elemento.id}"></td>
          </tr>
        `;
          currentIndex++;
          queue.enqueue(elemento);
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
          const elemento = queue.dequeue();
          const tiempoEspera = tiempoActual - elemento.tiempo_llegada;
          elemento.tiempo_espera = tiempoEspera;

          const tiempoRetorno = tiempoEspera + elemento.tiempo_burst;
          elemento.tiempo_turnaround = tiempoRetorno;
          
          tiempoActual += elemento.tiempo_burst;
          elemento.tiempo_completado = tiempoActual;
  
          const completionElement = document.getElementById(
            `completion-time-${elemento.id}`
          );
          const turnaroundElement = document.getElementById(
            `turnaround-time-${elemento.id}`
          );
          const waitingElement = document.getElementById(
            `waiting-time-${elemento.id}`
          );
  
          completionElement.textContent = elemento.tiempo_completado;
          turnaroundElement.textContent = elemento.tiempo_turnaround;
          waitingElement.textContent = elemento.tiempo_espera;
          currentIndex++;
          calculateValues();
        }, delay);
      }
    }

    const h2Element = document.getElementById('algoritmo');

    h2Element.innerHTML = 'First In, First Out';

    queue.enqueue(new ProcesoFIFO(0, 0, 4));
    queue.enqueue(new ProcesoFIFO(1, 2, 5));
    queue.enqueue(new ProcesoFIFO(2, 4, 3));
    queue.enqueue(new ProcesoFIFO(4, 5, 2));
    queue.enqueue(new ProcesoFIFO(6, 4, 4));

    let n = queue.getLength();

    processTable();

  }

  executeFIFO();
  