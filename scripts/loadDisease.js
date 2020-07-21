function selectDisease(cell) {
    var dropdownField = document.getElementById('dropdown-field');
    
    dropdownField.value = cell.innerText;
    dropdownField.style.backgroundColor = 'white';
    toggleDropdownBox();
}

function loadDisease() {
    var dropdownField = document.getElementById('dropdown-field');

    if (dropdownField.value == "") {
        dropdownField.style.backgroundColor = 'lightcoral';
    }
    else {
        //SQL
        console.log("Load disease: " + dropdownField.value);
    }
}