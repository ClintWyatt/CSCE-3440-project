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