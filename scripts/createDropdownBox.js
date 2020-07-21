var dropdownBox = '<table id="dropdown-box">'
var diseases = [];   //stores sample data

//SQL: get pre-made and a user's created diseases

diseases.push('Covid-19');
diseases.push('Bubonic Plague');
diseases.push('Yellow Fever');
diseases.push('SARS');
diseases.push('Ebola');

for (let i=0; i < diseases.length; i++) {
    dropdownBox += '<tr><td onclick="selectDisease(this)">' + diseases[i] + '</td></tr>';
}

dropdownBox += '</table>';

document.getElementById('dropdown-box-placeholder').innerHTML = dropdownBox;

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