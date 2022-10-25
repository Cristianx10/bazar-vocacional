import p5 from 'p5';
import Jail from './Jail';
class Bird {

    app: p5;

    width: number;
    height: number;
    posX: number;
    posY: number;
    isGrabbed: boolean;
    isInside: boolean;
    isOutside: boolean;
    img: p5.Image;
    value: number;

    posXInit: number;
    posYInit: number;

    jailContainer?: Jail;
    desfaceY: number;

    constructor(app: p5, posX: number, posY: number, isGrabbed: boolean, isInside: boolean, isOutside: boolean, img: p5.Image, value: number) {
        this.app = app;
        this.width = 47;
        this.height = 81;
        this.posX = posX + this.width / 2;
        this.posY = posY + this.height / 2;
        this.isGrabbed = isGrabbed;
        this.isInside = isInside;
        this.isOutside = isOutside;
        this.img = img;
        this.value = value;

        this.posXInit = this.posX;
        this.posYInit = this.posY;

        this.jailContainer = undefined;
        this.desfaceY = 0;
    }

    setBounds(desfaceY: number) {
        this.desfaceY = desfaceY;
    }

    posInit() {
        this.posX = this.posXInit;
        this.posY = this.posYInit;

        // this.animatePosition(this.posX, this.posXInit, (ref) => { this.posX += ref });
        // this.animatePosition(this.posY, this.posYInit, (ref) => { this.posY += ref });

        this.isGrabbed = false;
        this.isOutside = true;
        this.isInside = false;


    }

    paint() {

        if (this.width === -1 || this.height === -1) {
            this.width = this.img.width;
            this.height = this.img.height;
        }

        this.app.imageMode(this.app.CENTER);
        this.app.image(this.img, this.posX, this.posY);
        //text(this.value, this.posX, this.posY + 50);
    }

    insideJail(jail: Jail) {
        this.jailContainer = jail;

        this.isGrabbed = false;
        this.isOutside = false;
        this.isInside = true;
    }

    removeJail() {
        if (this.jailContainer != undefined) {
            var index = -1;
            this.jailContainer.capacity.forEach((bird, i) => {
                if (bird === this) {
                    index = i;
                }
            });

            if (index !== -1) {
                this.jailContainer.capacity.splice(index, 1);

            }

            this.jailContainer.calculateWeight();

            this.jailContainer = undefined;
        }
    }

    isHover() {
        var isHoverMouse = false;
        var mouseX = this.app.mouseX;
        var mouseY = this.app.mouseY;

        if (mouseX > (this.posX - this.width / 2) && mouseX < (this.posX + this.width / 2)
            && mouseY > (this.posY - this.height / 2) && mouseY < (this.posY + this.height / 2)) {
            isHoverMouse = true;
        }
        return isHoverMouse;
    }

}

export default Bird;