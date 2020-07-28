function toggleSlideMenu() {
  document.getElementById("slide-menu").classList.toggle("active");
  document.getElementById("grey-overlay").classList.toggle("active");

  if (isPaused && simulationStarted) {
    startSimulation();
  }
  else {
    pauseSimulation();
  }
}

//toggleSlideMenu();
