class ResultsScreens {
    constructor(app) {
        this.app = app;
        this.path = "/img/2022-01/diagnosticalos/";
        this.correctAnswers= [
            "Vertigo",
            "Faringitis",
            "Sinusitis",
            "Bronquitis",
            "Infección de oído",
            "Gastritis"
        ] 
        this.background = this.app.loadImage(this.path+'images/puntajefinal.png');
    }

    preload(){
        this.font = this.app.loadFont(this.path+'assets/Outfit-Regular.ttf')
    }

    draw() {
        this.app.image(this.background, 0, 0, 1280, 720);
    }

    drawResults(array, puntaje){

        let diagnosisArray = array;
        this.app.textFont(this.font);
        this.app.textSize(23);

        let result;

        for (let index = 0; index < diagnosisArray.length; index++) {

            if (diagnosisArray[index] === this.correctAnswers[index]) {
                result="Correcto";
                this.app.fill(0,255,0);
            }else{
                result="Incorrecto";
                this.app.fill(255,0,0);
            }
            this.app.text(result, 850, 312+(index*44));
        }

        this.app.fill(0);
        this.app.text(puntaje, 786, 598);

    }

    
}

export default ResultsScreens;