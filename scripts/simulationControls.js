//global variables
var weeksElapsed = 0;
var simulationStarted = false;
var simulationDone = false;
var isPaused = false;
var playSpeed = 2000; //2 second intervals
var isReset = false;

async function startSimulation() {
  if (simulationDone) {
    resetSimulation();
  }
  
  if (!simulationStarted && !simulationDone) {
    isReset = false;
    simulationStarted = true;
    weeksElapsed = 1;
    updateWeekCounter(1);

    for (weeksElapsed = 1; weeksElapsed < numWeeks; weeksElapsed++) {
      while (isPaused) {
        await sleep(50);
      }

      if (isReset) {
        return;
      }

      diseaseOutbreak();
      updateWeekCounter(weeksElapsed);
      await sleep(playSpeed);

      if (numSusceptible == 0 && numInfected == 0) {
        break;
      }
    }

    simulationStarted = false;
    simulationDone = true;
  }

  if (simulationStarted) {
    isPaused = false;
  }
}

function pauseSimulation() {
  if (simulationStarted) {
    isPaused = true;
  }
}

function resetSimulation() {
  createTable();
  updateWeekCounter(0);
  simulationStarted = false;
  simulationDone = false;
  isPaused = false;
  isReset = true;
}

function updateWeekCounter(weeks) {
  document.getElementById('week-counter').innerText = 'Week: ' + weeks;
}
