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
    $.get('/virusData', function(results) {
      //search for disease in results array
      for (let i = 0; i < results.length; i++) {
        if (results[i].virusName == dropdownField.value) {
          //set the global variables
          diseaseName = results[i].virusName;
          infectionRate = results[i].infectionRate;
          deathRate = results[i].deathRate;
          threshold = results[i].threshold;
          numWeeks = results[i].weeks;

          toggleSlideMenu();
          resetSimulation();
          setDiseaseNameLabel(diseaseName);
          
          if (!simulationStarted) {
            simulationDone = false;
          }

          break;
        }
      }
    });
  }
}
