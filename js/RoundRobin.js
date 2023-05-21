
//Definicion de clase como estructura de datos
class ProcesoRobin {

    constructor(id, tiempo_ejecucion){
        this.id = id;
        this.tiempo_ejecucion = tiempo_ejecucion;
    }

}

//Creacion del arreglo de objetos simulando una estructura de datos.
const procesos = [];
let n = document.getElementById('numeroProcesos').value;
let quantum = document.getElementById('quantum').value;
let tiempo_total = 0;

for(let i=0; i<n; i++){
    const idProceso = document.getElementById('idProceso').value;
    const tiempo_ejecucion = document.getElementById('tiempo_ejecucion').value; 

    const nuevoProceso = new ProcesoRobin(idProceso, tiempo_ejecucion);
    procesos.push(nuevoProceso);
}

//Ejecucion del algoritmo Round Robin
var tiempo_actual = 0;
while(tiempo_total > 0){
    for(let i=0; i<n; i++){
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
    }
}

//Se imprime un mensaje en consola de que todos los procesos finalizaron su ejecucion.
console.log("Todos los procesos han finalizado su ejecucion");