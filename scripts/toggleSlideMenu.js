var isMenuActive = false;

function toggleSlideMenu() {
  document.getElementById("slide-menu").classList.toggle("active");
  document.getElementById("grey-overlay").classList.toggle("active");
  
  if (isPaused && simulationStarted && isMenuActive) {
    startSimulation();
  }
  else {
    pauseSimulation();
  }
  
  isMenuActive = !isMenuActive;
}

toggleSlideMenu();
