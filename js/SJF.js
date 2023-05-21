//Definción de la estructura de datos
class ProcesoSJF {

    constructor(id, tiempo_llegada, tiempo_burst){
        this.id = id;
        this.tiempo_llegada = tiempo_llegada;
        this.tiempo_burst = tiempo_burst;
    }

}

//Función para comparar y ordenar los procesos por su tiempo de burst
function comparar_tiempo_burst(a, b){

    return a.tiempo_burst - b.tiempo_burst;
}

function executeSJF(){
    
    //Creación del arreglo de objetos simulando una estructura de datos
    let n = document.getElementById("noProcesos");
    const procesos = [];

    for(let i=0; i<n; i++){
        const tiempo_llegada = document.getElementById("tiempo_llegada").value;
        const tiempo_burst = document.getElementById("tiempo_burst").value; 

        const proceso = new ProcesoSJF(i+1, tiempo_llegada, tiempo_burst);
        procesos.push(proceso);
    }

    procesos.sort(comparar_tiempo_burst);

    console.log("Orden de ejecucion de los procesos segun el Shortest Job First");
    for(let i=0; i<n; i++){
        console.log(`Proceso ${procesos[i].id}`);
    }

}
