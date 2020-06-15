//get cell's id based on position in table
function getCellId(cell) {
  return cell.parentNode.rowIndex * numCols + cell.cellIndex;
}

//change the selected cell text
function changeSelected(cell) {
  document.getElementById("selectedLabel").innerText =
    "Selected grid id: " + getCellId(cell);
  document.getElementById("populationLabel").innerText =
    "Population: " + boxes[getCellId(cell)].population;
  document.getElementById("infectedLabel").innerText =
    "Infected: " + boxes[getCellId(cell)].infected;
  document.getElementById("deadLabel").innerText =
    "Dead: " + boxes[getCellId(cell)].dead;
}

//this would be moved to '../models' once node is installed
class Box {
  constructor(population, infected, dead) {
    this.population = population;
    this.infected = infected;
    this.dead = dead;
  }
}

var boxes = [];
let totalPopulation = 0;
let totalInfected = 0;
let totalDead = 0;

//create random sample data
for (let i = 0; i < numRows * numCols; i++) {
  let randPop = Math.floor(Math.random() * 700) + 300; //random from 300 to 700
  let randInf = Math.floor(Math.random() * 300) + 100;
  let randDead = Math.floor(Math.random() * 200);

  totalPopulation += randPop;
  totalInfected += randInf;
  totalDead += randDead;

  boxes.push(new Box(randPop, randInf, randDead));
}

document.getElementById("totalPopLabel").innerText =
  "Total population: " + totalPopulation;
document.getElementById("totalInfLabel").innerText =
  "Total infected: " + totalInfected;
document.getElementById("totalDeadLabel").innerText =
  "Total dead: " + totalDead;

//get all cells
//var cells = document.getElementsByTagName("td");
