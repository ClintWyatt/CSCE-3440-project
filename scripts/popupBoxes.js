//show help popup for a certain field that is selected
function showPopup(field) {
  resetAllPopups();

  document.getElementById(field + "-popup").style.opacity = "1";
  document.getElementById(field + "-popup").style.zIndex = "3";
  document.getElementsByName(field)[0].style.backgroundColor = "white";
}

//hide all popups
function resetAllPopups() {
  document.getElementById("diseaseName-popup").style.opacity = "0";
  document.getElementById("diseaseName-popup").style.zIndex = "0";
  document.getElementById("infRate-popup").style.opacity = "0";
  document.getElementById("infRate-popup").style.zIndex = "0";
  document.getElementById("deathRate-popup").style.opacity = "0";
  document.getElementById("deathRate-popup").style.zIndex = "0";
  document.getElementById("threshold-popup").style.opacity = "0";
  document.getElementById("threshold-popup").style.zIndex = "0";
  document.getElementById("numWeeks-popup").style.opacity = "0";
  document.getElementById("numWeeks-popup").style.zIndex = "0";
}
