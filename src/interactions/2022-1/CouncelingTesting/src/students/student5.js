import Student from "./student";

class Student5 extends Student{

    constructor(posX, posY,app){

        super(posX, posY,app);

        this.sprite = this.app.loadImage(this.path+"img/student5.png");

        this.madSprite = this.app.loadImage(this.path+"img/student5mad.png");

        this.question5 = this.app.loadImage(this.path+"img/question5.png");

        this.question8 = this.app.loadImage(this.path+"img/question8.png");

        this.question16 = this.app.loadImage(this.path+"img/question16.png");

        this.question5Called = false;

        this.question8Called = false;

        this.question16Called = false;

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

        if(this.question5Called){

            this.app.image(this.question5, 608, 330);

        }

        if(this.question8Called){

            this.app.image(this.question8, 608, 330);

        }

        if(this.question16Called){

            this.app.image(this.question16, 608, 330);

        }

    }

}
export default Student5;