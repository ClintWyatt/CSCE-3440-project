//global variables
const numRows = 50;
const numCols = 80;
var diseaseName = "";
var infectionRate = 0;  //represents how likely a neighborhood while become infected
var deathRate = 0;      //represents how likely a neighborhood while die
var threshold = 0;       //represents the amount of adjacent neighbors that can cause a suceptible neighbor to become infected
var numWeeks = 0;
var infectionPeriod = 5; //represetns how long the neighborhood is infected
var numRandomJumps = 0;  //represents how many times the disease has jumped randomly
var neighborhood = [];
var x;
var numInfected = 0;
var numVacinated = 0;
var numRecovered = 0;
var numSusceptible = 0;
var numDead = 0;
var infection;

//create the html table over the map image
function createTable() {
  var table = '<table id="graph">'; //represents a html table
  var n = new Neighborhood();

  //resetting values
  neighborhood = [];
  numInfected = 0;
  numVacinated = 0;
  numRecovered = 0;
  numSusceptible = 0;
  numDead = 0;
  numRandomJumps = 0;
  
  n.setInfectionPeriod(infectionPeriod); //setting the time period a neighborhood will be infected for
  
  for (i = 0; i < numRows * numCols; i++) {
    neighborhood.push(n);
    n = new Neighborhood(); //must do this to prevent all objects refering to 1 object
    n.setInfectionPeriod(infectionPeriod);
  }
  
  //generating the table graph
  for (i = 0; i < numRows; i++) {
    table += "<tr>";
    for (j = 0; j < numCols; j++) {
      table += '<td class="graph-td"></td>';
    }
    table += "</tr>";
  }
  table += "</table>";
  
  document.getElementById('graph-placeholder').innerHTML = table; //writting the table to the document
  x = document.getElementsByClassName("graph-td"); //getting all the columns in the table
  infection = generateNumber(0, numRows);
  
  while (numInfected == 0) { //ensures at least 1 starting location is chosen
    //randomly set states of the graph
    for (i = 0; i < x.length; i++) { //number of columns in the graph
      if (!isOceanCell(i)) {
        if (infection < 2 && numInfected < 1) { //1 starting location
          x[i].style.backgroundColor = "red"; //infected
          neighborhood[i].setStatus("red");
          numInfected++;
        }
        else if (infection > numRows * 0.02 && infection <= numRows * 2.6) {
          x[i].style.backgroundColor = "blue"; //vacinated
          neighborhood[i].setStatus("blue");
          numVacinated++;
        }
        else if (infection > numRows * 2.6 && infection <= numRows * 3.0) {
          x[i].style.backgroundColor = "green"; //recovered
          neighborhood[i].setStatus("green");
          numRecovered++;
        }
        else {
          x[i].style.backgroundColor = "yellow"; //susceptible
          neighborhood[i].setStatus("yellow");
          numSusceptible++;
        }
  
        infection = generateNumber(0, (numRows * numRows));
      }
    }
  }
}

createTable();
