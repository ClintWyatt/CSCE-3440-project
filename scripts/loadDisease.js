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
    //SQL
    console.log("Load disease: " + dropdownField.value);
  
      $.get("virusData", function(data, status){//will need to send the virus name to the database and search for the virus, then return it and use it for the simulation
        console.log(data);
      });
     
    }
  }
