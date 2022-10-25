import Student from "./student";

class Student1 extends Student {

    constructor(posX, posY, app) {

        super(posX, posY, app);

        this.sprite = this.app.loadImage(this.path+"img/student1.png");

        this.madSprite =this.app.loadImage(this.path+"img/student1mad.png");

        this.question1 = this.app.loadImage(this.path+"img/question1.png");

        this.question4 = this.app.loadImage(this.path+"img/question4.png");

        this.question15 = this.app.loadImage(this.path+"img/question15.png");

        this.question20 = this.app.loadImage(this.path+"img/question20.png");

        this.question1Called = false;

        this.question4Called = false;

        this.question15Called = false;

        this.question20Called = false;

        this.isMad = false;

    }

    paint() {

        this.app.imageMode(this.app.CENTER);

        if(!this.isMad){
            this.app.image(this.sprite, this.posX, this.posY);
        }
        else{
            this.app.image(this.madSprite, this.posX, this.posY);
        }

        if(this.question1Called){

            this.app.image(this.question1, 608, 330);

        }

        if(this.question4Called){

            this.app.image(this.question4, 608, 330);

        }

        if(this.question15Called){

            this.app.image(this.question15, 608, 330);

        }

        if(this.question20Called){

            this.app.image(this.question20, 608, 330);

        }

    }

    getMad(){
        
        this.isMad = true;

        console.log("mad");

    }

    getHappy(){

        this.isMad = false;

    }

}

export default Student1;