import Diagnosis from "./diagnosis";

class DiagnosisScreen {
    constructor(app) {
        this.app = app;
        this.path = "/img/2022-01/diagnosticalos/"
        //Loading image
        this.background = this.app.loadImage(this.path+'images/diagnosis_screen.jpg');

        //Diagnosis/answers - array to save the answers
        this.diagnosis = [];

        //Diagnosis squares array
        this.squares = [];
        this.squares.push(new Diagnosis(605, 340, "Faringitis",this.app));
        this.squares.push(new Diagnosis(605, 395, "Sinusitis",this.app));
        this.squares.push(new Diagnosis(605, 445, "Alergia",this.app));
        this.squares.push(new Diagnosis(605, 500, "Neumonía",this.app));
        this.squares.push(new Diagnosis(775, 340, "Bronquitis",this.app));
        this.squares.push(new Diagnosis(775, 395, "Gastritis",this.app));
        this.squares.push(new Diagnosis(775, 445, "Intoxicación",this.app));
        this.squares.push(new Diagnosis(775, 500, "Embarazo",this.app));
        this.squares.push(new Diagnosis(945, 340, "Vertigo",this.app));
        this.squares.push(new Diagnosis(945, 395, "Infección de oído",this.app));

        //Variables
        this.answered = false;
        this.nextScreen = 0;
    }

    draw() {
        //Background
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.background, 0, 0, 1280, 720);

        //Options
        for (let index = 0; index < this.squares.length; index++) {
            this.squares[index].draw();
        }
    }

    clicked() {
        for (let index = 0; index < this.squares.length; index++) {
            if (this.squares[index].isClicked()) {
                this.diagnosis.push(this.squares[index].getSickness());
                this.answered = true;
            }
        }
    }

    isAnswered(){
        return this.answered;
    }

    setAnswered(answered) {
        this.answered = answered;
    }

    setNextScreen(nextScreen) {
        this.nextScreen = nextScreen;
    }

    getNextScreen() {
        return this.nextScreen;
    }

    getDiagnosis() {
        return this.diagnosis;
    }
}


export default DiagnosisScreen;