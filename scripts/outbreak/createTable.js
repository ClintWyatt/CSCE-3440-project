threshold = 2;       //represents the amount of adjacent neighbors that can cause a suceptible neighbor to become infected
infectionPeriod = 5; //represetns how long the neighborhood is infected
infectionRate = 30;  //represents how likely a neighborhood while become infected
deathRate = 10;      //represents how likely a neighborhood while die

/*end of simulation functions */
var table = "<table Id = graph>"; //represents a html table
const numRows = 50;
const numCols = 80;
//creating the neighborhood object
let neighborhood = [];
var n = new Neighborhood();

n.setInfectionPeriod(infectionPeriod); //setting the time period a neighborhood will be infected for

for (i = 0; i < numRows * numCols; i++) {
  neighborhood.push(n);
  n = new Neighborhood(); //must do this to prevent all objects refering to 1 object
  n.setInfectionPeriod(infectionPeriod);
}
//const neighborhood = new Neighborhood()[67,600];//creating a 2d array of neighborhoods

//generating tha table graph
for (i = 0; i < numRows; i++) {
  table += "<tr>";
  for (j = 0; j < numCols; j++) {
    table += '<td id="' + (i * numCols + j).toString() + '" class="graph-td"></td>';
  }
  table += "</tr>";
}
table += "</table>";

document.write(table); //writting the table to the document
var x = document.getElementsByClassName("graph-td"); //getting all the columns in the table
var infection = generateNumber(0, numRows);

/*variables for the count of different states neighborhoods could be in */
let numInfected = 0;
let numVacinated = 0;
let numRecovered = 0;
let numsusceptible = 0;
let numDead = 0;

while (numInfected == 0) { //ensures at least 1 starting location is chosen
  //randomly set states to the graph
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
      }
      else if (infection > numRows * 2.6 && infection <= numRows * 3.0) {
        x[i].style.backgroundColor = "green"; //recovered
        neighborhood[i].setStatus("green");
      }
      else {
        x[i].style.backgroundColor = "yellow"; //susceptible
        neighborhood[i].setStatus("yellow");
      }

      infection = generateNumber(0, (numRows * numRows));
    }
  }
}
