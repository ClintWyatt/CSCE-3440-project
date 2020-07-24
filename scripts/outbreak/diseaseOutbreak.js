function diseaseOutbreak(){
    //start outbreak
    var Check = new GraphCheck();//using the GaphCheck object to simulate the virus outbreak
    let z =0;
    display = 2; //represents the stoping point 
    let outbreak = true;
    //console.log(outbreak);
    //console.log(neighborhood.length);
    while(outbreak === true && z < display)
    {
      
      numInfected =0; //resetting the number of infected neighborhoods
      for(i=0; i < neighborhood.length; i++)//number of columns in the graph
      {
        if(i === 0)
        {
          Check.topLeftCorner(neighborhood, i, numCols);
        }
        else if(i === numRows*(numCols -1))
        {
          Check.bottomLeftCorner(neighborhood, i, numCols);
        }
        else if(i === numCols - 1)
        {
          Check.topRightCorner(neighborhood, i, numCols);
        }
        else if(i === (numRows * numCols) -1)
        {
          Check.bottomRightCorner(neighborhood, i, numCols);
        }
        else if(i % numCols === 0)
        {
          Check.leftSide(neighborhood, i, numCols - 2);
        }
        else if(i % numCols === numCols -1)
        {
          Check.rightSide(neighborhood, i, numCols);
        }
        else if(i > (numRows * numCols) - numCols)
        {
          Check.bottomRow(neighborhood, i, numCols);
        }
        else if(i < numCols)
        {
          Check.topRow(neighborhood, i, numCols);
        }
        else
        {
          Check.innerGraph(neighborhood, i, numCols);
        }
      }
      //outbreak = true;//for debugging purposes
      for(i =0; i < neighborhood.length; i++)
      {
        if(neighborhood[i].getStatus() === "susceptible")
        {
          //console.log("threshold at " + i + ": " + neighborhood[i].getThreshold());
          if(neighborhood[i].getThreshold() >= threshold)
          {
            neighborhood[i].setStatus("red");//infected
            x[i].style.backgroundColor = "red";//infected     
          }
        }
        else if(neighborhood[i].getStatus() === "infected")
        {
          //console.log("infection at " + i);
          if(neighborhood[i].getInfection() > infectionPeriod)
          {
            neighborhood[i].setStatus("green"); //changing the neighborhood to recoverred
            x[i].style.backgroundColor = "green";//infected
            numInfected--; //decrementing the number of infected neighborhoods.
            numRecovered++;
          }
          else
          {
            neighborhood[i].incrementInfection();//increment the number of days the neighborhood is infected
          }
        }
      }
      for(k =0; k < neighborhood.length; k++)
      {
        if(neighborhood[k].getStatus() === "infected"){numInfected++;}
      }
      if(numInfected === 0){outbreak = false;}
      z++;
  }
}
//another loop needed to chenge states (infected to recovered or susceptible to infected)