class ProcesoMLFQ {

    constructor(id, arrival_time, burst_time, priority, remaining_time) {
      this.id = id;
      this.arrival_time = arrival_time;
      this.burst_time = burst_time;
      this.priority = priority;
      this.remaining_time = remaining_time;
    }

  }
  
  class Queue {
    constructor() {
      this.procesos = [];
      this.front = -1;
      this.rear = -1;
    }
  
    enqueue(proceso) {
      this.rear++;
      this.procesos[this.rear] = proceso;
    }
  
    dequeue() {
      this.front++;
      return this.procesos[this.front];
    }
  
    isEmpty() {
      return this.front === this.rear;
    }
  }
  
function executeMLFQ(){
  
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
          
  const queue1 = new Queue();
  const queue2 = new Queue();
  const queue3 = new Queue();
  
  queue1.enqueue(new ProcesoMLFQ(0, 0, 4));
  queue1.enqueue(new ProcesoMLFQ(1, 2, 5));
  queue1.enqueue(new ProcesoMLFQ(2, 4, 3));
  queue1.enqueue(new ProcesoMLFQ(4, 5, 2));
  queue1.enqueue(new ProcesoMLFQ(6, 4, 4));

  
  while (!(queue1.isEmpty() && queue2.isEmpty() && queue3.isEmpty())) {
    if (!queue1.isEmpty()) {
      const proceso = queue1.dequeue();
      proceso.remaining_time -= quantum;
      time += quantum;
      console.log(`Proceso ${proceso.id} ejecutado por ${quantum} segundos en la cola 1`);
  
      if (proceso.remaining_time > 0) {
        proceso.priority = 2;
        queue2.enqueue(proceso);
      } else {
        console.log(`El proceso ${proceso.id} completado en ${time} segundos`);
      }
    } else if (!queue2.isEmpty()) {
      const proceso = queue2.dequeue();
      proceso.remaining_time -= quantum;
      time += quantum;
      console.log(`Proceso ${proceso.id} ejecutado por ${quantum} segundos en la cola 2`);
  
      if (proceso.remaining_time > 0) {
        proceso.priority = 3;
        queue3.enqueue(proceso);
      } else {
        console.log(`El proceso ${proceso.id} completado en ${time} segundos`);
      }
    } else if (!queue3.isEmpty()) {
      const proceso = queue3.dequeue();
      proceso.remaining_time -= quantum;
      time += quantum;
      console.log(`Proceso ${proceso.id} ejecutado por ${quantum} segundos en la cola 3`);
  
      if (proceso.remaining_time > 0) {
        proceso.priority = 3;
        queue3.enqueue(proceso);
      } else {
        console.log(`El proceso ${proceso.id} completado en ${time} segundos`);
      }
    }

  } currentIndex++;
  calculateValues();
}, delay);
}
}
const h2Element = document.getElementById('algoritmo');

    h2Element.innerHTML = 'First In, First Out';
}
executeMLFQ();