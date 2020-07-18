function clearAllFields() {
    var diseaseNameField = document.getElementById('disease-name-field');
    var infRateField = document.getElementById('infection-rate-field');
    var thresholdField = document.getElementById('threshold-field');
    var numDaysField = document.getElementById('num-days-field');

    diseaseNameField.value = "";
    infRateField.value = "";
    thresholdField.value = "";
    numDaysField.value = "";

    diseaseNameField.style.backgroundColor = 'white';
    infRateField.style.backgroundColor = 'white';
    thresholdField.style.backgroundColor = 'white';
    numDaysField.style.backgroundColor = 'white';
}

function validateFields() {
    var diseaseNameField = document.getElementById('disease-name-field');
    var infRateField = document.getElementById('infection-rate-field');
    var thresholdField = document.getElementById('threshold-field');
    var numDaysField = document.getElementById('num-days-field');
    var allFieldsValid = true;

    if (diseaseNameField.value.length == 0) { //or if name already exists (SQL)
        allFieldsValid = false;
        diseaseNameField.style.backgroundColor = 'lightcoral';
    }
    if (!isNumber(infRateField.value) || infRateField.value < 1 || infRateField.value > 100 || infRateField.value == '') {
        allFieldsValid = false;
        infRateField.style.backgroundColor = 'lightcoral';
    }
    if (!isNumber(thresholdField.value) || thresholdField.value < 1 || thresholdField.value > 8 || thresholdField.value == '') {
        allFieldsValid = false;
        thresholdField.style.backgroundColor = 'lightcoral';
    }
    if (!isNumber(numDaysField.value) || numDaysField.value < 1 || numDaysField.value == '') {
        allFieldsValid = false;
        numDaysField.style.backgroundColor = 'lightcoral';
    }

    if (allFieldsValid) {
        console.log("Disease creation successful!"); //store disease (SQL)
    }
}

function isNumber(value) {
    var str = value.toString();
    var num = parseInt(value);
    num = num.toString();

    if (num == 'NaN')
        return false;

    return num.length == str.length;
}