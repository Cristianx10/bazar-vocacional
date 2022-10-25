import p5 from 'p5';

import Bird from './Bird';
class Jail {


    minHeight: number;
    maxHeight: number;
    minWeight: number;
    maxWeight: number;
    totalHeight: number;
    jailHeight: number;
    weight: number;
    posX: number;
    posY: number;
    capacity: Bird[];

    widthJail: number;
    heightJail: number;

    widthRope: number;
    heightRope: number;

    img: p5.Image;
    rope: p5.Image;


    movement: number;
    movementStatic: number;
    jailRef?: Jail;

    app: p5;

    constructor(app: p5, posX: number, posY: number, weight: number) {
        this.app = app;

        this.widthRope = 0;
        this.heightRope = 0;

        this.widthJail = 174;
        this.heightJail = 186;

        this.minHeight = 20;
        this.maxHeight = 300;
        this.minWeight = 1;
        this.maxWeight = 10;
        this.totalHeight = 1070;
        this.jailHeight = 177;
        this.weight = weight;
        this.posX = posX;
        this.posY = posY;
        this.capacity = [];

        this.rope = this.app.loadImage("/img/2020-2/contaduria-publica/img/rope-img.png", () => {
            this.widthRope = this.rope.width;
            this.heightRope = this.rope.height;
        });
        
        this.widthRope = this.rope.width;
        this.heightRope = this.rope.height;
        this.img = this.app.loadImage("/img/2020-2/contaduria-publica/img/jail-img.png");

        this.movement = 0;
        this.movementStatic = 20;
        this.jailRef = undefined;
    };

    paint() {
        var posY = this.getPostY();

        this.app.imageMode(this.app.CENTER);
        this.app.image(this.img, this.posX, posY);
        this.app.image(this.rope, this.posX, posY - (this.heightRope / 2) - 75);

    }

    compareJail(jail: Jail) {
        this.jailRef = jail;
    }

    addBird(bird: Bird) {
        if (this.capacity.length < 3) {

            if (bird.jailContainer !== this) {
                bird.insideJail(this);
                this.capacity.push(bird);
            }
            this.calculateWeight();
        }
    }

    calculateWeight() {
        var weight = 0;

        this.capacity.forEach(bird => {
            weight += bird.value;
        })

        this.weight = weight;

        this.movement = this.weight * this.minHeight / this.minWeight;

        this.updatePositionBirds();
        if (this.jailRef) {
            this.jailRef.updatePositionBirds();
        }
    }

    updatePositionBirds() {
        this.capacity.forEach((bird, i) => {
            bird.posX = this.posX - (this.widthJail / 2) + (48 * i) + 50;
            bird.posY = this.getPostY() + 60 + bird.desfaceY;
        })
    }

    isHover() {
        var isHoverMouse = false;
        var posY = this.getPostY();

        var mouseX = this.app.mouseX;
        var mouseY = this.app.mouseY;

        if (mouseX > (this.posX - this.widthJail / 2) && mouseX < (this.posX + this.widthJail / 2)
            && mouseY > (posY - this.heightJail / 2) && mouseY < (posY + this.heightJail / 2) && this.capacity.length < 3) {
            isHoverMouse = true;
        }
        return isHoverMouse;
    }

    getPostY() {

        var posY = this.posY + this.movementStatic + this.movement;

        if (this.jailRef) {
            posY -= this.jailRef.movement;
        }

        return posY;
    }

}

export default Jail;