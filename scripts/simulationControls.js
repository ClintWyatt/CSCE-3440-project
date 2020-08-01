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
<<<<<<< HEAD
=======
    simulationDone = false;
>>>>>>> c5129c9c402f0af545c8d2f8ca01ee38c210e9e1
  }
  
  if (!simulationStarted && !simulationDone) {
    isReset = false;
    simulationStarted = true;
    weeksElapsed = 1;
    updateWeekCounter(1);

<<<<<<< HEAD
    for (weeksElapsed = 1; weeksElapsed < numWeeks; weeksElapsed++) {
=======
    for (weeksElapsed = 1; weeksElapsed < numWeeks + 1; weeksElapsed++) {
>>>>>>> c5129c9c402f0af545c8d2f8ca01ee38c210e9e1
      while (isPaused) {
        await sleep(50);
      }

      if (isReset) {
        isReset = false;
        simulationStarted = false;
        return;
      }
      
      diseaseOutbreak();
      updateWeekCounter(weeksElapsed);
      
      if (numSusceptible == 0 && numInfected == 0) {
        break;
      }
      
      await sleep(playSpeed);

<<<<<<< HEAD
      if (numSusceptible == 0 && numInfected == 0) {
        break;
=======
      if (isReset) {
        isReset = false;
        simulationStarted = false;
        return;
>>>>>>> c5129c9c402f0af545c8d2f8ca01ee38c210e9e1
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
  isReset = true;
  createTable();
  updateWeekCounter(0);
<<<<<<< HEAD
  simulationStarted = false;
  simulationDone = false;
=======
>>>>>>> c5129c9c402f0af545c8d2f8ca01ee38c210e9e1
  isPaused = false;
}

function updateWeekCounter(weeks) {
  document.getElementById('week-counter').innerText = 'Week: ' + weeks;
}
