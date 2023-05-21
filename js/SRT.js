/*
* vamos a iniciar con la definicion de nuestra estructura
*/

class ProcesoSRT {
    constructor(pid, arrival_time, burst_time) {
        this.pid = pid; // identificador de procesos
        this.arrival_time = arrival_time; // tiempo de llegada
        this.burst_time = burst_time; // tiempo de uso de cpu
        this.waiting_time = 0; // tiempo de espera
        this.turnaround_time = 0; // tiempo de retorno
        this.completation_time = 0; // tiempo de finalizacion
        this.remaining_time = burst_time; // tiempo restante
    }
}

// funcion para hacer el intercambio de procesos
function swap(a, b) {
    let flag = a;
    a = b;
    b = flag;
}

// funcion para ordenar los procesos por tiempo de llegada
function sort_arrival_time(procesos) {
    for (let i = 0; i < procesos.length - 1; i++) {
        for (let j = i + 1; j < procesos.length; j++) {
            if (procesos[i].arrival_time > procesos[j].arrival_time) {
                // Hacer swapping
                swap(procesos[i], procesos[j]);
            }
        }
    }
}

// funcion para ordenar los procesos usando su burst 
function sort_by_burst(procesos) {
    for (let i = 0; i < procesos.length - 1; i++) {
        for (let j = i + 1; j < procesos.length; j++) {
            if (procesos[i].burst_time > procesos[j].burst_time) {
                swap(procesos[i], procesos[j]);
            }
        }
    }
}

// Implementacion del algoritmo SRT
// 1. Ordenar los procesos por tiempo de llegada
// 2. Utilizar un ciclo para iterar sobre los procesos y planificacion en la CPU.
// 3. En cada iteracion hay que verificar si el tiempo actual es menor que el tiempo de llegada de cada proceso, si es asi, entonces
// 4. Establecemos el tiempo actual
function func_sort(procesos) {
    sort_arrival_time(procesos);
    let current_time = 0;
    for (let i = 0; i < procesos.length; i++) {
        if (current_time < procesos[i].arrival_time) {
            current_time = procesos[i].arrival_time;
        }
        procesos[i].waiting_time = current_time - procesos[i].arrival_time;
        procesos[i].turnaround_time = procesos[i].waiting_time + procesos[i].burst_time;
        procesos[i].completation_time = current_time + procesos[i].burst_time;
        current_time = procesos[i].completation_time;
    }
}

function executeSRT(){
    
    let n = document.getElementById('noProcesos').value

    for(let i=0; i<n; i++){
        const pid = document.getElementById('pid').value;
        const at = document.getElementById('at').value;
        const bt = document.getElementById('bt').value;
        
        const np = new ProcesoSRT(pid, at, bt);
        procesos.push(np);
    }


    func_sort(procesos);
    console.log("PID\tArrival Time\tBurst Time\tWaiting Time\tTurnaround Time");
    for (let i = 0; i < procesos.length; i++) {
        console.log(`${procesos[i].PID}\t\t${procesos[i].pid}\t\t${procesos[i].arrival_time}\t\t${procesos[i].burst_time}\t\t${procesos[i].waiting_time}\t\t${procesos[i].turnaround_time}`);
    }

}
