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
    });
  }
}
