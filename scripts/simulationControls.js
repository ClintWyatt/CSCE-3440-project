const numDays = 30;
var daysElapsed = 0;
var simulationStarted = false;
var isPaused = false;

async function startSimulation() {
    if (!simulationStarted) {
        simulationStarted = true;

        for (let i=0; i < numDays; i++) {
            while (isPaused) {
                await sleep(50);
            }

            diseaseOutbreak();
            await sleep(1000);
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