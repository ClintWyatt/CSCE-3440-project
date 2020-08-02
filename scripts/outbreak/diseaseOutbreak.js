//start outbreak
function diseaseOutbreak() {
  var Check = new GraphCheck(); //using the GraphCheck object to simulate the virus outbreak

  for (i = 0; i < neighborhood.length; i++ ) { //number of columns in the graph
    if (i === 0) {
      Check.topLeftCorner(neighborhood, i, numCols);
    }
    else if (i === numRows * (numCols - 1)) {
      Check.bottomLeftCorner(neighborhood, i, numCols);
    }
    else if (i === numCols - 1) {
      Check.topRightCorner(neighborhood, i, numCols);
    }
    else if (i === numRows * numCols - 1) {
      Check.bottomRightCorner(neighborhood, i, numCols);
    }
    else if (i % numCols === 0) {
      Check.leftSide(neighborhood, i, numCols - 2);
    }
    else if (i % numCols === numCols - 1) {
      Check.rightSide(neighborhood, i, numCols);
    }
    else if (i > numRows * numCols - numCols) {
      Check.bottomRow(neighborhood, i, numCols);
    }
    else if (i < numCols) {
      Check.topRow(neighborhood, i, numCols);
    }
    else {
      Check.innerGraph(neighborhood, i, numCols);
    }
  }

  //update status of the table cells
  for (i = 0; i < neighborhood.length; i++) {
    if (neighborhood[i].getStatus() === "susceptible") {
      if (neighborhood[i].getThreshold() >= threshold && generateNumber(1, 100) <= infectionRate) {
        neighborhood[i].setStatus("red"); //infected
        x[i].style.backgroundColor = "red"; //infected
        numInfected++;
        numSusceptible--;
      }
    }
    else if (neighborhood[i].getStatus() === "infected") {
      if (neighborhood[i].getInfection() > infectionPeriod && (numInfected > 1 || numSusceptible == 0) && generateNumber(1, 100) <= (100 - infectionRate)) {
        if (generateNumber(1, 100) <= deathRate) {
          neighborhood[i].setStatus("black"); //changing the neighborhood to recoverred
          x[i].style.backgroundColor = "black"; //infected
          x[i].style.opacity = "0.5";
          numInfected--; //decrementing the number of infected neighborhoods.
          numDead++;
        }
        else {
          neighborhood[i].setStatus("green"); //changing the neighborhood to recoverred
          x[i].style.backgroundColor = "green"; //infected
          numInfected--; //decrementing the number of infected neighborhoods.
          numRecovered++;
        }
      }
      else {
        neighborhood[i].incrementInfection(); //increment the number of days the neighborhood is infected
      }
    }
  }

  //chance to see if the disease will jump randomly on the map (only 2 jumps total allowed)
  if (numRandomJumps < 2 && weeksElapsed > 3 && generateNumber(1, 100) <= Math.floor(infectionRate / 3)) {
    var randomLocation = pickRandomDenseCell();
    var loopTimeout = 0; //just in case there are no open spots, the loop won't be infinite

    while (neighborhood[randomLocation].getStatus() != "susceptible" && loopTimeout < 200) {
      randomLocation = pickRandomDenseCell();
      loopTimeout++;
    }

    neighborhood[randomLocation].setStatus("red");
    x[randomLocation].style.backgroundColor = "red";
    numInfected++;
    numSusceptible--;
    numRandomJumps++;
  }
}

//generates a random int between two values
function generateNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}
