import Student from "./student";

class Student3 extends Student{

        constructor(posX, posY,app){

        super(posX, posY, app);

        this.sprite = this.app.loadImage(this.path+"img/student3.png");
        
        this.madSprite = this.app.loadImage(this.path+"img/student3mad.png");

        this.question6 = this.app.loadImage(this.path+"img/question6.png");

        this.question12 = this.app.loadImage(this.path+"img/question12.png");

        this.question17 = this.app.loadImage(this.path+"img/question17.png");

        this.question21 = this.app.loadImage(this.path+"img/question21.png");

        this.question6Called = false;

        this.question12Called = false;

        this.question17Called = false;

        this.question21Called = false;

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

        if(this.question6Called){

            this.app.image(this.question6, 608, 330);

        }

        if(this.question12Called){

            this.app.image(this.question12, 608, 330);

        }

        if(this.question17Called){

            this.app.image(this.question17, 608, 330);

        }

        if(this.question21Called){

            this.app.image(this.question21, 608, 330);

        }

    }

}
export default Student3;