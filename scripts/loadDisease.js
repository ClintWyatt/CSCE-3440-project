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
    document.getElementById('dropdown-field').value = cell.innerText;
    document.getElementById('dropdown-field').style.backgroundColor = 'white';
    toggleDropdownBox();
}

function loadDisease() {
    if (document.getElementById('dropdown-field').value == "") {
        document.getElementById('dropdown-field').style.backgroundColor = 'lightcoral';
    }
    else {
        console.log("Load disease"); //SQL
    }
}