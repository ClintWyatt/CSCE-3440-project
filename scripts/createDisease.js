function clearAllFields() {
  var diseaseNameField = document.getElementById("disease-name-field");
  var infRateField = document.getElementById("infection-rate-field");
  var deathRateField = document.getElementById("death-rate-field");
  var thresholdField = document.getElementById("threshold-field");
  var numWeeksField = document.getElementById("num-weeks-field");

  diseaseNameField.value = "";
  infRateField.value = "";
  deathRateField.value = "";
  thresholdField.value = "";
  numWeeksField.value = "";

  diseaseNameField.style.backgroundColor = "white";
  infRateField.style.backgroundColor = "white";
  deathRateField.style.backgroundColor = "white";
  thresholdField.style.backgroundColor = "white";
  numWeeksField.style.backgroundColor = "white";
}


function validateFields() {
  var diseaseNameField = document.getElementById("disease-name-field");
  var infRateField = document.getElementById("infection-rate-field");
  var deathRateField = document.getElementById("death-rate-field");
  var thresholdField = document.getElementById("threshold-field");
  var numWeeksField = document.getElementById("num-weeks-field");
  var allFieldsValid = true;
  console.log(diseaseNameField.value+ " " + thresholdField.value);
  if (diseaseNameField.value.length == 0) { //or if name already exists (SQL)
    allFieldsValid = false;
    diseaseNameField.style.backgroundColor = "lightcoral";
  }
  if (!isNumber(infRateField.value) || infRateField.value < 1 || infRateField.value > 100 || infRateField.value == "") {
    allFieldsValid = false;
    infRateField.style.backgroundColor = "lightcoral";
  }
  if (
    !isNumber(deathRateField.value) || deathRateField.value < 1 || deathRateField.value > 100 || deathRateField.value == "") {
    allFieldsValid = false;
    deathRateField.style.backgroundColor = "lightcoral";
  }
  if (!isNumber(thresholdField.value) || thresholdField.value < 1 || thresholdField.value > 8 || thresholdField.value == "") {
    allFieldsValid = false;
    thresholdField.style.backgroundColor = "lightcoral";
  }
  if (!isNumber(numWeeksField.value) || numWeeksField.value < 1 || numWeeksField.value == "") {
    allFieldsValid = false;
    numWeeksField.style.backgroundColor = "lightcoral";
  }

  if (allFieldsValid) {
    console.log("Disease creation successful!"); //store disease (SQL)

    //sending the information to the server to see if the virus entered by the user can be added to the database.
    $.ajax({
  method: "POST",
  url: "virusData",
  data: { disease: document.getElementById("disease-name-field").value,
       infRate: document.getElementById("infection-rate-field").value,
       deathRate: document.getElementById("death-rate-field").value,
       threshold: document.getElementById("threshold-field").value,
       numWeeks: document.getElementById("num-weeks-field").value }
    });
  }
}

function isNumber(value) {
  var str = value.toString();
  var num = parseInt(value);
  num = num.toString();

  if (num == "NaN") {
    return false;
  }
  else {
    return num.length == str.length;
  }
}
