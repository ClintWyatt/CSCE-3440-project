class Neighborhood{
 constructor()
 {
     this.exposed = false;
     this.vacinated = false;
     this.infected = false;
     this.recovered = false;
     this.exposedPeriod = 0;
     this.infectionDay = 7;//time it takes for someone to go from exposed to infected
     this.infectionPeriod = 7; //time someone is infected with the virus
     this.infectionDay =0;
 }
 setExposed()
 {
     this.exposed = true;
 }
 setVacinated()
 {
     this.vacinated = true;
 }
 setInfected()
 {
     this.infected = true;
 }
 setRecovered()
 {
     this.recovered = true;
 }
 getExposedPeriod()
 {
     return this.exposedPeriod;
 }
 getInfected()
 {
     return this.infected;
 }
 getVacinated()
 {
     return this.vacinated;
 }
 getRecovered()
 {
     return this.recovered;
 }
 incrementExposed()
 {
     this.exposedPeriod++;
 }
 isInfected()
 {
     if(this.vacinated === false)
     {
        if(this.exposedPeriod === this.infectionDay)
        {
            
        }
    }
 }

}

class DiseaseGraph {

    neighbor = new Neighborhood[260][260];




}