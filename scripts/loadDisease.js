//sets the text inside the load disease box
function selectDisease(cell) {
  var dropdownField = document.getElementById("dropdown-field");

  dropdownField.value = cell.innerText;
  dropdownField.style.backgroundColor = "white";
  toggleDropdownBox();
}

//gets a disease's properties from the database and loads it for the simulator
function loadDisease() {
  var dropdownField = document.getElementById("dropdown-field");
  
  if (dropdownField.value == "") {
    dropdownField.style.backgroundColor = "lightcoral";
  }
  else {
    //fetch data for the virus
    fetch('/virusData/' + dropdownField.value)
      .then(results => results.json())
      .then(resultsArr => {
        //set the global variables
        diseaseName = resultsArr[0].virusName;
        infectionRate = resultsArr[0].infectionRate;
        deathRate = resultsArr[0].deathRate;
        threshold = resultsArr[0].threshold;
        numWeeks = resultsArr[0].weeks;

        toggleSlideMenu();
        resetSimulation();
        setDiseaseNameLabel(diseaseName);
        
        if (!simulationStarted) {
          simulationDone = false;
        }
      });
  }
}
