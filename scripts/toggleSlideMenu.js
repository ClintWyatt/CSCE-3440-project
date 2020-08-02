var isMenuActive = false; //is menu currently showing

//toggle the visibility of the slide menu
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
