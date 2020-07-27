//global variables
const numWeeks = 52;
var weeksElapsed = 0;
var simulationStarted = false;
var isPaused = false;
var playSpeed = 2500; //2.5 second intervals
var isReset = false;

async function startSimulation() {
  if (!simulationStarted) {
    isReset = false;
    simulationStarted = true;

    for (weeksElapsed = 0; weeksElapsed < numWeeks; weeksElapsed++) {
      while (isPaused) {
        await sleep(50);
      }

      if (isReset) {
        return;
      }

      diseaseOutbreak();
      await sleep(playSpeed);
    }

    simulationStarted = false;
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
  simulationStarted = false;
  isPaused = false;
  isReset = true;
}
