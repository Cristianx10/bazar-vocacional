class Question {
    constructor(y, height, img, points, app){
        //Question image variables
        this.x = 125;
        this.y = y;
        this.width = 385;
        this.height = height;
        this.app = app;

        //Points added to final score
        this.points = points;

        //Loading question image
        this.img = this.app.loadImage(img);

        //If clicked, hide
        this.click = false;
    }

    draw() {
        //Question image
        if (this.click == false) {
            this.app.image(this.img, this.x, this.y, this.width, this.height);
        }
    }

    clicked() {
        if (this.app.mouseX > this.x && this.app.mouseX < this.x+this.width && this.app.mouseY > this.y && this.app.mouseY < this.y+this.height) {
            return true;
        } else {
            return false;
        }
    }

    getPoints() {
        return this.points;
    }

    setClick(click) {
        this.click = click;
    }
}
export default Question;