const numDays = 30;
var simulationStarted = false;

async function startSimulation() {
    if (!simulationStarted) {
        simulationStarted = true;

        for (let i=0; i < numDays; i++) {
            diseaseOutbreak();
            await sleep(1000);
        }

        simulationStarted = false;
    }
}