class State{//represents the state of the neighborhood (infected, recovered, vacinated, etc)

constructor()
{
    this.status ="nope";//the status refers to "recovered", "vacinated", "suceptible", etc
}
 getStatus()
 {
     return this.status;//returning the status
 }
 setStatus(color)//color represents the state of the neighborhood
 {
     if(color === "green")
     {
        this.status = "recovered";
     }
     else if(color === "blue")
     {
         this.status = "vacinated";
     }
     else if(color === "red")
     {
         this.status = "infected";
     }
     else if(color === "yellow")
     {
         this.status = "susceptible";
     }
 }
}

class Neighborhood extends State{//represents the squares on the graph in htmlTable.html

    /*constructor(color){
        super(color);
        this.status = color;
    }
    */
   constructor()
   {
       super();
       this.threshold =0;//represents how many adjacent neighborhoods must be infected for this neighborhood to be infected
       this.infectionPeriod =0;//represents how long the neihgborhood must be infected for
       this.infection =0; //represents the amount of days the neighborhood has been infected. If it is equal to infection period, the neighborhood's 
       //state goes to recovered.
   }
    isInfected(color)
    {
        if(color === "red")
        {
            return true;
        }
        return false;
    }
    isVacinated(color)
    {
        if(color === "blue")
        {
            return true;
        }
        return false;
    }
    isSuceptible(color)
    {
        if(color === "yellow")
        {
            return true;
        }
        return false;
    }
    isRecovered(color)
    {
        if(color ==="green")
        {
            return true;
        }
        return false;
    }
    setThreshold(x)
    {
        this.threshold = x;
    }
    getThreshold()
    {
        return this.threshold;
    }
    incrementThreshold()
    {
        this.threshold++;
    }
    setInfectionPeriod(x)
    {
        this.infectionPeriod = x;
    }
    stillInfected()
    {
        if(this.infection < this.infectionPeriod)
        {
            this.infection++;
        }
        else
        {
            this.setStatus("green");//set status of the neighborhood to recovered
        }
    }

}


