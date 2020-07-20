function toggleDropdownBox() {
    var dropdownBox = document.getElementById("dropdown-box");
    var dropdownIcon = document.getElementById("dropdown-icon");

    if (dropdownBox.style.display == 'block') {
        dropdownBox.style.display = 'none';
        dropdownIcon.classList.remove('gg-arrow-up-r');
        dropdownIcon.classList.add('gg-arrow-down-r');
    }
    else {
        dropdownBox.style.display = 'block';
        dropdownIcon.classList.remove('gg-arrow-down-r');
        dropdownIcon.classList.add('gg-arrow-up-r');
    }
}

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