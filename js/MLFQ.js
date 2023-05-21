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
  
  const quantum = 2;
  const n = 5;
  let time = 0;
  
  const queue1 = new Queue();
  const queue2 = new Queue();
  const queue3 = new Queue();
  
  const p1 = new Proceso(1, 0, 6, 1, 6);
  const p2 = new Proceso(2, 2, 4, 2, 4);
  const p3 = new Proceso(3, 3, 3, 3, 3);
  const p4 = new Proceso(4, 4, 5, 1, 5);
  const p5 = new Proceso(3, 3, 3, 3, 3);
  
  queue1.enqueue(p1);
  queue1.enqueue(p2);
  queue1.enqueue(p3);
  queue1.enqueue(p4);
  queue1.enqueue(p5);
  
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

  }
  