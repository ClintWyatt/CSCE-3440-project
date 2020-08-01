/*
    Description: The GraphCheck class is responsible for checking other neighborhoods nearby the current one (at index x).
    
*/

class GraphCheck{
     topLeftCorner(neighborhood, x, numCols){//top left corner of the graph
      
        if(neighborhood[x].getStatus() === "susceptible"){//if the current neighborhood is suceptible
  
          if(neighborhood[x+1].getStatus() === "infected")//if the neighbor to the right is infected
          {
            neighborhood[x].incrementThreshold();
          }
          if(neighborhood[x+ numCols].getStatus() === "infected")//if the neighbor below is infected
          {
            neighborhood[x].incrementThreshold();
          }
          if(neighborhood[x + (numCols +1)].getStatus() === "infected")//if the neighbor's bottom right diagonal is infected
          {
            neighborhood[x].incrementThreshold();
          }
        }
      }
       topRightCorner(neighborhood, x, numCols){//top right corner of the graph
        
        if(neighborhood[x].getStatus() === "susceptible"){//if the current neighborhood is suceptible
          
          if(neighborhood[x-1].getStatus() === "infected")//if the neighbor to the left is infected
          {
            neighborhood[x].incrementThreshold();
          }
          if(neighborhood[(x + numCols)].getStatus() === "infected")//if the neighbor below is infected
          {
            neighborhood[x].incrementThreshold();
          }
          if(neighborhood[(x + numCols) -1].getStatus() === "infected")//if the neighbor bottom left diagonal is infected
          {
            neighborhood[x].incrementThreshold();
          }
        }
      }
       bottomLeftCorner(neighborhood, x, numCols){
        if(neighborhood[x].getStatus() === "susceptible"){//if the current neighborhood is suceptible
  
          if(neighborhood[x - numCols].getStatus() === "infected")//if the neighbor above is infected
          {
            neighborhood[x].incrementThreshold();
          }
          if(neighborhood[(x - numCols) +1].getStatus() === "infected")//if the upper right neighbor is infected
          {
            neighborhood[x].incrementThreshold();
          }
          if(neighborhood[x +1].getStatus() === "infected")//if the neighbor to the right is infected
          {
            neighborhood[x].incrementThreshold();
          }
        }
      } 
       bottomRightCorner(neighborhood, x, numCols){
        if(neighborhood[x].getStatus() === "susceptible"){//if the current neighborhood is suceptible
  
          if(neighborhood[x - numCols].getStatus() === "infected")//if the neighbor above is infected
          {
            neighborhood[x].incrementThreshold();
          }
          if(neighborhood[(x - numCols) - 1].getStatus() === "infected")//if the upper left neighbor is infected
          {
            neighborhood[x].incrementThreshold();
          }
          if(neighborhood[x -1].getStatus() === "infected")//if the neighbor to the left is infected
          {
            neighborhood[x].incrementThreshold();
          }
        }
      }
   leftSide(neighborhood, x, numCols){
    if(neighborhood[x].getStatus() === "susceptible"){
  
      if(neighborhood[x - numCols].getStatus()  === "infected"){//if the neighbor above is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x - numCols +1].getStatus() === "infected"){//if the neighbor to the top right is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x+1].getStatus() === "infected"){//if the neighbor to the right is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x + numCols +1].getStatus() === "infected"){//if the neighbor to the bottom right is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x + numCols].getStatus() === "infected"){//if the neighbor to the bottom is infected
        neighborhood[x].incrementThreshold();
      }
    }
  }
   rightSide(neighborhood, x, numCols){
    if(neighborhood[x].getStatus() === "susceptible"){//if the neighbor has not been infected yet and is not vacinated
  
      if(neighborhood[x - numCols].getStatus()  === "infected"){//if the neighbor above is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x -(numCols + 1)].getStatus() === "infected"){//if the neighbor to the top left is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x-1].getStatus() === "infected"){//if the neighbor to the left is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x + (numCols - 1)].getStatus() === "infected"){//if the neighbor to the bottom left is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x + numCols].getStatus() === "infected"){//if the neighbor to the bottom is infected
        neighborhood[x].incrementThreshold();
      }
    }
  }
   topRow(neighborhood, x, numCols){
    if(neighborhood[x].getStatus() === "susceptible"){//if the neighbor has not been infected yet and is not vacinated
  
      if(neighborhood[x - 1].getStatus() === "infected"){//if the neighbor to the left is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[(x -1) + numCols].getStatus() === "infected"){//if the neighbor to the bottom left is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x + numCols].getStatus() === "infected"){//if the neighbor below is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x + (numCols + 1)].getStatus() === "infected"){//if the bottom right neighbor is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x + 1].getStatus() === "infected"){//if the neighbor right is infected
        neighborhood[x].incrementThreshold();
      }
    }
  }
   bottomRow(neighborhood, x, numCols){
    if(neighborhood[x].getStatus() === "susceptible"){//if the neighbor has not been infected yet and is not vacinated
  
      if(neighborhood[x - 1].getStatus() === "infected"){//if the neighbor to the left is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x - (numCols -1)].getStatus() === "infected"){//if the neighbor to the top left is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x - numCols].getStatus() === "infected"){//if the neighbor above is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x - (numCols + 1)].getStatus() === "infected"){//if the top right neighbor is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x + 1].getStatus() === "infected"){//if the neighbor right is infected
        neighborhood[x].incrementThreshold();
      }
    }
  }
   innerGraph(neighborhood, x, numCols){
    
    if(neighborhood[x].getStatus() === "susceptible"){//if the neighbor has not been infected yet and is not vacinated
      
      if(neighborhood[x - 1].getStatus() === "infected"){//if the neighbor to the left is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x - (numCols) -1].getStatus() === "infected"){//if the neighbor to the top left is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x - numCols].getStatus() === "infected"){//if the neighbor above is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x - (numCols) +1].getStatus() === "infected"){//if the top right neighbor is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x + 1].getStatus() === "infected"){//if the neighbor right is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x + (numCols) -1].getStatus() === "infected"){//if the neighbor to the bottom left is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x + numCols].getStatus() === "infected"){//if the neighbor below is infected
        neighborhood[x].incrementThreshold();
      }
      if(neighborhood[x + (numCols) + 1].getStatus() === "infected"){//if the bottom right neighbor is infected
        neighborhood[x].incrementThreshold();
      }
    }
  }
}
