const numDays = 30;
var simulationStarted = false;
var isPaused = false;
var playSpeed = 2500; //2.5 second intervals

async function startSimulation() {
    if (!simulationStarted) {
        simulationStarted = true;

        for (let i=0; i < numDays; i++) {
            while (isPaused) {
                await sleep(50);
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