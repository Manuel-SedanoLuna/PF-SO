function schedule_fcfs(processes, n) {
  let current_time = 0;
  let completion_time = [];
  let turnaround_time = [];
  let waiting_time = [];

  // Ordenar los procesos según el tiempo de llegada
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (processes[j].arrival_time > processes[j + 1].arrival_time) {
        let temp = processes[j];
        processes[j] = processes[j + 1];
        processes[j + 1] = temp;
      }
    }
  }

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
        tableElement.innerHTML += `
        <tr>
          <td><input type="checkbox" name="process" value="${processes[i].pid}"></td>
          <td>${processes[i].pid}</td>
          <td>${processes[i].arrival_time}</td>
          <td>${processes[i].burst_time}</td>
          <td id="completion-time-${processes[i].pid}"></td>
          <td id="turnaround-time-${processes[i].pid}"></td>
          <td id="waiting-time-${processes[i].pid}"></td>
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
        if (current_time < processes[i].arrival_time) {
          current_time = processes[i].arrival_time;
        }
        completion_time[i] = current_time + processes[i].burst_time;
        turnaround_time[i] = completion_time[i] - processes[i].arrival_time;
        waiting_time[i] = turnaround_time[i] - processes[i].burst_time;
        current_time = completion_time[i];

        const completionElement = document.getElementById(
          `completion-time-${processes[i].pid}`
        );
        const turnaroundElement = document.getElementById(
          `turnaround-time-${processes[i].pid}`
        );
        const waitingElement = document.getElementById(
          `waiting-time-${processes[i].pid}`
        );

        completionElement.textContent = completion_time[i];
        turnaroundElement.textContent = turnaround_time[i];
        waitingElement.textContent = waiting_time[i];
        currentIndex++;
        calculateValues();
      }, delay);
    }
  }

  processTable();
}

const processes = [
  { pid: 0, arrival_time: 0, burst_time: 6 },
  { pid: 1, arrival_time: 1, burst_time: 2 },
  { pid: 2, arrival_time: 6, burst_time: 4 },
  { pid: 3, arrival_time: 3, burst_time: 3 },
  { pid: 4, arrival_time: 4, burst_time: 5 },
];

const n = processes.length;
schedule_fcfs(processes, n);