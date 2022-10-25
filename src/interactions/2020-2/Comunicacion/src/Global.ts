
class Global {
    puntuacion: number;
    puntuacion1 : number;
    puntuacion2 : number;
    puntuacion3 : number;
    tiempo: number;

    constructor(){

        this.puntuacion = 0;
        this.puntuacion1 = 0;
        this.puntuacion2 = 0;
        this.puntuacion3 = 0;
        this.tiempo = 300;

        setInterval(()=>{
            this.tiempo--;
        }, 1000)

        
    }
}

export default Global;