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


  function executeFIFO() {
    const queue = new Queue();
  
    for(let i=0; i<n; i++){
        const p = document.getElementById('proceso').value;
        queue.enqueue(p);
    }
    
    const elemento1 = queue.dequeue();
    const elemento2 = queue.dequeue();
  }
  