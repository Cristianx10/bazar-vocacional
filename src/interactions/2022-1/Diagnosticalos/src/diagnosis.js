class Diagnosis {
    constructor(x, y, sickness, app) {
        //Square variables
        this.app = app;
        this.x = x;
        this.y = y;
        this.sides = 30;
        this.color = this.app.color(158, 171, 243);

        //Information
        this.sickness = sickness;
    }

    draw() {
        this.app.fill(this.color);
        this.app.noStroke();
        this.app.rect(this.x, this.y, this.sides, this.sides, 5);

        this.hover();
    }

    hover() {
        if (this.app.mouseX > this.x && this.app.mouseX < this.x+this.sides && this.app.mouseY > this.y && this.app.mouseY < this.y+this.sides) {
            this.color = this.app.color(236, 56, 11);
        } else {
            this.color = this.app.color(158, 171, 243);
        }
    }

    isClicked() {
        if (this.app.mouseX > this.x && this.app.mouseX < this.x+this.sides && this.app.mouseY > this.y && this.app.mouseY < this.y+this.sides) {
            this.color = this.app.color(236, 56, 11);
            return true;
        } else {
            return false;
        }
    }

    getSickness() {
        return this.sickness;
    }
}

export default Diagnosis;