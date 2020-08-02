//global variables
var weeksElapsed = 0;
var simulationStarted = false;
var simulationDone = false;
var isPaused = false;
var playSpeed = 2000; //2 second intervals
var isReset = false;

//start playing the simulation
async function startSimulation() {
  if (simulationDone) {
    resetSimulation();
    simulationDone = false;
  }
  
  if (!simulationStarted && !simulationDone) {
    isReset = false;
    simulationStarted = true;

    for (weeksElapsed = 0; weeksElapsed < numWeeks + 1; weeksElapsed++) {
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

      if (isReset) {
        isReset = false;
        simulationStarted = false;
        return;
      }
    }

    simulationStarted = false;
    simulationDone = true;
  }
  
  if (simulationStarted) {
    isPaused = false;
  }
}

//pause the simulation
function pauseSimulation() {
  if (simulationStarted) {
    isPaused = true;
  }
}

//start a fresh graph
function resetSimulation() {
  isReset = true;
  createTable();
  updateWeekCounter(0);
  isPaused = false;
}

//update the week counter above the simulator
function updateWeekCounter(weeks) {
  document.getElementById('week-counter').innerText = 'Week: ' + weeks;
}

//set the disease name label above the simulator
function setDiseaseNameLabel(name) {
  var diseaseNameLabel = document.getElementById('disease-name-label');
  diseaseNameLabel.innerText = name;
}
