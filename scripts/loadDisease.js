function selectDisease(cell) {
  var dropdownField = document.getElementById("dropdown-field");

  dropdownField.value = cell.innerText;
  dropdownField.style.backgroundColor = "white";
  toggleDropdownBox();
}

//need to change this method, but will be useful for the drop down menu when selecting viruses
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
          infectionRate = Math.floor(results[i].infectionRate / 2);
          deathRate = results[i].deathRate;
          threshold = results[i].threshold;
          numWeeks = results[i].weeks;

          toggleSlideMenu();
          resetSimulation();
          
          if (!simulationStarted) {
            simulationDone = false;
          }

          break;
        }
      }
    });
  }
}
