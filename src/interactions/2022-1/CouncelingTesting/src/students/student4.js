import Student from "./student";

class Student4 extends Student{

    constructor(posX, posY,app){

        super(posX, posY,app);

        this.sprite = this.app.loadImage(this.path+"img/student4.png");

        this.madSprite = this.app.loadImage(this.path+"img/student4mad.png");
        
        this.question3 = this.app.loadImage(this.path+"img/question3.png");

        this.question11 = this.app.loadImage(this.path+"img/question11.png");

        this.question14 = this.app.loadImage(this.path+"img/question14.png");

        this.question18 = this.app.loadImage(this.path+"img/question18.png");

        this.question3Called = false;

        this.question11Called = false;

        this.question14Called = false;

        this.question18Called = false;

        this.isMad = false;

    }

    paint(){

        this.app.imageMode(this.app.CENTER);
                
        if(!this.isMad){
            this.app.image(this.sprite, this.posX, this.posY);
        }
        else{
            this.app.image(this.madSprite, this.posX, this.posY);
        }

        if(this.question3Called){

            this.app.image(this.question3, 608, 330);

        }

        if(this.question11Called){

            this.app.image(this.question11, 608, 330);

        }

        if(this.question14Called){

            this.app.image(this.question14, 608, 330);

        }

        if(this.question18Called){

            this.app.image(this.question18, 608, 330);

        }

    }

}
export default Student4;