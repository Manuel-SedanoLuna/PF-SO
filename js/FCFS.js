document.addEventListener("DOMContentLoaded", function () {
  returnNumberFromFile().then(function (current_time) {
    let arrivals = [
      current_time,
      current_time + 1,
      current_time + 6,
      current_time + 3,
      current_time + 4,
    ];
    let processes = [
      { pid: 0, arrival_time: arrivals[0], burst_time: 6 },
      { pid: 1, arrival_time: arrivals[1], burst_time: 2 },
      { pid: 2, arrival_time: arrivals[2], burst_time: 4 },
      { pid: 3, arrival_time: arrivals[3], burst_time: 3 },
      { pid: 4, arrival_time: arrivals[4], burst_time: 5 },
    ];
    let n = processes.length;

    function schedule_fcfs(processes, n) {
      let current_time = parseInt(document.getElementById("timer").textContent);
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
      <th>STATUS</th>
      <th>Tiempo en ejecuci&oacute;n</th>
    </tr>
  `;

      let currentIndex = 0;
      const delay = 1000;

      function processTable() {
        if (currentIndex < n) {
          const i = currentIndex;
          tableElement.innerHTML += `
        <tr id="process-row-${processes[i].pid}">
          <td><input type="checkbox" name="process" value="${processes[i].pid}"></td>
          <td>${processes[i].pid}</td>
          <td>${processes[i].arrival_time}</td>
          <td>${processes[i].burst_time}</td>
          <td id="completion-time-${processes[i].pid}"></td>
          <td id="turnaround-time-${processes[i].pid}"></td>
          <td id="waiting-time-${processes[i].pid}"></td>
          <td id="status-${processes[i].pid}">En espera</td>
          <td id="execution-time-${processes[i].pid}">0 segundos</td>
        </tr>
      `;
          currentIndex++;
          processTable();
        } else {
          currentIndex = 0;
          executeProcesses();
        }
      }

      function executeProcesses() {
        if (currentIndex < n) {
          const i = currentIndex;
          if (current_time < processes[i].arrival_time) {
            current_time = processes[i].arrival_time;
          }
          const completionElement = document.getElementById(
            `completion-time-${processes[i].pid}`
          );
          const turnaroundElement = document.getElementById(
            `turnaround-time-${processes[i].pid}`
          );
          const waitingElement = document.getElementById(
            `waiting-time-${processes[i].pid}`
          );

          let executionTime = 0;
          const executionElement = document.getElementById(
            `execution-time-${processes[i].pid}`
          );
          const statusElement = document.getElementById(
            `status-${processes[i].pid}`
          );

          const intervalId = setInterval(() => {
            if (executionTime <= processes[i].burst_time) {
              executionElement.textContent = executionTime + " segundos";
              executionTime++;

              // Actualizar el estado del proceso
              if (executionTime <= processes[i].burst_time) {
                statusElement.textContent = "Ejecutándose";
                statusElement.style.backgroundColor = "rgba(22, 138, 6, 0.664)";
              } else {
                statusElement.textContent = "Terminado";
              }
            } else {
              clearInterval(intervalId);

              completion_time[i] = current_time + processes[i].burst_time;
              turnaround_time[i] =
                completion_time[i] - processes[i].arrival_time;
              waiting_time[i] = turnaround_time[i] - processes[i].burst_time;
              current_time = completion_time[i];

              completionElement.textContent = completion_time[i];
              turnaroundElement.textContent = turnaround_time[i];
              waitingElement.textContent = waiting_time[i];

              // Actualizar el estado del proceso como "Terminado"
              statusElement.textContent = "Terminado";
              statusElement.style.backgroundColor = "rgba(255, 72, 0, 0.753)";
              currentIndex++;
              executeProcesses();

              // Eliminar la fila de la tabla después de 4 segundos
              setTimeout(() => {
                const rowElement = document.getElementById(
                  `process-row-${processes[i].pid}`
                );
                rowElement.parentNode.removeChild(rowElement);
              }, 15000);
            }
          }, delay);
        }
      }

      processTable();
    }

    const h2Element = document.getElementById('algoritmo');

    h2Element.innerHTML = 'First Come, First Serve';

    schedule_fcfs(processes, n);

    // Obtener referencia al botón "Agregar Proceso"
    const addProcessBtn = document.getElementById("add-process-btn");

    // Agregar event listener al botón "Agregar Proceso"
    addProcessBtn.addEventListener("click", addProcess);

    function addProcess() {
      const maxProcesses = 5; // Número máximo de procesos permitidos

      // Verificar cantidad de procesos en ejecución o en espera
      if (processes.length >= maxProcesses) {
        const messageElement = document.getElementById("message");
        messageElement.textContent = "Solo se permiten 5 procesos a la vez";
        return; // Salir de la función si se alcanza el límite de procesos
      }

      // Generar nuevo ID para el proceso
      const newPid =
        processes.length > 0 ? processes[processes.length - 1].pid + 1 : 0;

      // Obtener tiempo de llegada del nuevo proceso
      const timerElement = document.getElementById("timer");
      const arrivalTime = parseInt(timerElement.textContent);

      // Generar tiempo de ráfaga aleatorio para el nuevo proceso
      const minBurstTime = 1;
      const maxBurstTime = 10;
      const newBurstTime =
        Math.floor(Math.random() * (maxBurstTime - minBurstTime + 1)) +
        minBurstTime;

      // Crear nuevo objeto de proceso
      const newProcess = {
        pid: newPid,
        arrival_time: arrivalTime,
        burst_time: newBurstTime,
      };

      // Agregar el nuevo proceso al arreglo de procesos
      processes.push(newProcess);

      // Actualizar la longitud n del arreglo
      n = processes.length;

      // Volver a llamar a la función schedule_fcfs() con los procesos actualizados
      schedule_fcfs(processes, n);
    }
  });
});
