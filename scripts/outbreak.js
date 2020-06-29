class State{
 /*constructor(color)//color represents a color, which will determine the state
 {
     this.status = color;
 }
 */
 getStatus()
 {
     return this.status;//returning the status
 }
 setStatus(color)//color represents 
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

class Neighborhood extends State{

    /*constructor(color){
        super(color);
        this.status = color;
    }
    */
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
 

}

class DiseaseGraph {

    neighbor = new Neighborhood[260][260];




}