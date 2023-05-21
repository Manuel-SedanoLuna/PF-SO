// Definimos una clase "Queue"
class Queue {
    constructor() {
      this.elements = new Array(MAX_QUEUE_SIZE);
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
  }
  
  


  // Programa principal
  function main() {
    const queue = new Queue();
  
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(8);
    queue.enqueue(4);
    queue.enqueue(6);
  
    const elemento1 = queue.dequeue();
    const elemento2 = queue.dequeue();
  }
  
  main();