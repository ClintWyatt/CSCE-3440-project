//start outbreak
function diseaseOutbreak() {
  var Check = new GraphCheck(); //using the GaphCheck object to simulate the virus outbreak
  let z = 0;
  display = 2; //represents the stoping point
  let outbreak = true;

  while (outbreak === true && z < display) {

    for (i = 0; i < neighborhood.length; i++ ) {//number of columns in the graph
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

    //outbreak = true;//for debugging purposes
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
        if (neighborhood[i].getInfection() > infectionPeriod && numInfected > 1) {
          if (generateNumber(1, 100) <= deathRate) {
            neighborhood[i].setStatus("black"); //changing the neighborhood to recoverred
            x[i].style.backgroundColor = "black"; //infected
            x[i].style.opacity = "0.5";
            numInfected--; //decrementing the number of infected neighborhoods.
            numDead++;
          }
          else if (generateNumber(1, 100) <= 75) {
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
    if (numInfected === 0) {
      outbreak = false;
    }
    z++;

    //chance to see if the disease will jump randomly on the map (only 2 jumps total allowed)
    if (numRandomJumps < 2 && generateNumber(1, 100) <= infectionRate / 3) {
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
}
//another loop needed to chenge states (infected to recovered or susceptible to infected)

function generateNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}