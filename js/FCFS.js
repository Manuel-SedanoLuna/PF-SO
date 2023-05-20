function schedule_fcfs(processes, n) {
  let current_time = 0;
  let completion_time = [];
  let turnaround_time = [];
  let waiting_time = [];
  let total_turnaround_time = 0;
  let total_waiting_time = 0;

  // Ordenar los procesos según el tiempo de llegada
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1; j++) {
      if (processes[j].arrival_time > processes[j + 1].arrival_time) {
        let temp = processes[j];
        processes[j] = processes[j + 1];
        processes[j + 1] = temp;
      }
    }
  }

  // Calcular el tiempo de completado, tiempo de espera y tiempo de retorno de cada proceso
  for (let i = 0; i < n - 1; i++) {
    if (current_time < processes[i].arrival_time) {
      current_time = processes[i].arrival_time;
    }
    completion_time[i] = current_time + processes[i].waiting_time;
    turnaround_time[i] = completion_time[i] - processes[i].arrival_time;
    waiting_time[i] = turnaround_time[i] - processes[i].waiting_time;
    current_time = completion_time[i];
    total_turnaround_time += turnaround_time[i];
    total_waiting_time += waiting_time[i];
  }

  // Mostrar los resultados del algoritmo en la ventana
  const outputElement = document.getElementById("fcfs-output");
  outputElement.textContent =
    "process\t tiempo-de-llegada\t tiempo-de-espera\t tiempo-completado\t tiempo-turnaround\t tiempo-de-espera\n";
  for (let i = 0; i < n - 1; i++) {
    outputElement.textContent += `${processes[i].pid}\t ${processes[i].arrival_time}\t ${processes[i].waiting_time}\t ${completion_time[i]}\t ${turnaround_time[i]}\t ${waiting_time[i]}\n`;
  }
  outputElement.textContent += `Tiempo de retorno promedio: ${(
    total_turnaround_time / n
  ).toFixed(2)}\n`;
  outputElement.textContent += `Tiempo de espera promedio: ${(
    total_waiting_time / n
  ).toFixed(2)}`;
}

const processes = [
  { pid: 0, arrival_time: 0, waiting_time: 6 },
  { pid: 1, arrival_time: 1, waiting_time: 2 },
];

const n = processes.length;
schedule_fcfs(processes, n);
