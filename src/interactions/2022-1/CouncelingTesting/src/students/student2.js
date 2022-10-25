import Student from "./student";

class Student2 extends Student{

    constructor(posX, posY,app){

        super(posX, posY,app);

        this.sprite = this.app.loadImage(this.path+"img/student2.png");

        this.madSprite = this.app.loadImage(this.path+"img/student2mad.png");

        this.question2 = this.app.loadImage(this.path+"img/question2.png");

        this.question7 = this.app.loadImage(this.path+"img/question7.png");

        this.question10 = this.app.loadImage(this.path+"img/question10.png");

        this.question22 = this.app.loadImage(this.path+"img/question22.png");

        this.question2Called = false;

        this.question7Called = false;

        this.question10Called = false;

        this.question22Called = false;

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

        if(this.question2Called){

            this.app.image(this.question2, 608, 330);

        }

        if(this.question7Called){

            this.app.image(this.question7, 608, 330);

        }

        if(this.question10Called){

            this.app.image(this.question10, 608, 330);

        }

        if(this.question22Called){

            this.app.image(this.question22, 608, 330);

        }

    }

}
export default Student2;