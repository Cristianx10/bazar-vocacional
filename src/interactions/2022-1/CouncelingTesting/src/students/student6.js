import Student from "./student";

class Student6 extends Student{

    constructor(posX, posY,app){

        super(posX, posY,app);

        this.sprite = this.app.loadImage(this.path+"img/student6.png");

        this.madSprite = this.app.loadImage(this.path+"img/student6mad.png");

        this.question9 = this.app.loadImage(this.path+"img/question9.png");

        this.question13 = this.app.loadImage(this.path+"img/question13.png");

        this.question19 = this.app.loadImage(this.path+"img/question19.png");

        this.question9Called = false;

        this.question13Called = false;

        this.question19Called = false;

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

        if(this.question9Called){

            this.app.image(this.question9, 608, 330);

        }

        if(this.question13Called){

            this.app.image(this.question13, 608, 330);

        }

        if(this.question19Called){

            this.app.image(this.question19, 608, 330);

        }

    }

}
export default Student6;