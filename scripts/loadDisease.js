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
<<<<<<< HEAD
      var indexOfDisease = 0;
      var diseaseFound = false;

      for (indexOfDisease = 0; indexOfDisease < results.length; indexOfDisease++) {
        if (results[indexOfDisease].virusName == dropdownField.value) {
          diseaseFound = true;
          break;
        }
      }

      if (diseaseFound) {
        //set the global variables
        diseaseName = results[indexOfDisease].virusName;
        infectionRate = Math.floor(results[indexOfDisease].infectionRate / 2);
        deathRate = results[indexOfDisease].deathRate;
        threshold = results[indexOfDisease].threshold;
        numWeeks = results[indexOfDisease].weeks;
      }

      toggleSlideMenu();
      resetSimulation();
=======
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
>>>>>>> c5129c9c402f0af545c8d2f8ca01ee38c210e9e1
    });
  }
}
