//fetch disease data and populate the dropdown box with names
function createDropdownBox() {
  fetch('/virusData')
    .then(results => results.json())
    .then(resultsArr => {
      var dropdownBox = '<table id="dropdown-box">';
      var diseases = [];
    
      for (let i = 0; i < resultsArr.length; i++) {
        diseases.push(resultsArr[i].virusName);
      }

      for (let i = 0; i < diseases.length; i++) {
        dropdownBox += '<tr><td onclick="selectDisease(this)">' + diseases[i] + "</td></tr>";
      }
      
      dropdownBox += "</table>";
      
      document.getElementById("dropdown-box-placeholder").innerHTML = dropdownBox;
    });
}

//toggle the visibility of the dropdown box
function toggleDropdownBox() {
  var dropdownBox = document.getElementById("dropdown-box");
  var dropdownIcon = document.getElementById("dropdown-icon");
  
  if (dropdownBox.style.display == "block") {
    dropdownBox.style.display = "none";
    dropdownIcon.classList.remove("gg-arrow-up-r");
    dropdownIcon.classList.add("gg-arrow-down-r");
  }
  else {
    dropdownBox.style.display = "block";
    dropdownIcon.classList.remove("gg-arrow-down-r");
    dropdownIcon.classList.add("gg-arrow-up-r");
  }
}

createDropdownBox();
