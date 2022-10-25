import p5 from 'p5';
class Brick {

    protected posX: number;
    protected posY: number;
    protected xOffset: number;
    protected yOffset: number;
    protected size: number;

    protected axis: string;
    protected over: boolean;
    protected locked: boolean;

    protected app: p5;
    protected img?: p5.Image;

    constructor(posX: number, posY: number, size: number | undefined, axis: string, app: p5) {

        if (size !== undefined) {
            this.posX = posX;
            this.posY = posY;
            this.size = size;
            this.axis = axis;
            this.xOffset = 0;
            this.yOffset = 0;
            this.over = false;
            this.locked = false;
            this.app = app;
        } else {
            this.posX = posX;
            this.posY = posY;
            this.axis = axis;
            this.xOffset = 0;
            this.yOffset = 0;
            this.locked = false;
            this.over = false;
            this.app = app;
            this.size = 0;
        }

    }

    draw() {
        if (this.img) {
            this.over = this.app.mouseX > this.posX && this.app.mouseX < this.posX + this.img.width && this.app.mouseY > this.posY && this.app.mouseY < this.posY + this.img.height;
        }
        if (this.img) {
            this.app.image(this.img, this.posX, this.posY);
        }
        if (this.over || this.locked) {
            this.app.noFill();
            this.app.stroke(0);
            this.app.strokeWeight(2);
            if (this.img) {
                this.app.rect(this.posX, this.posY, this.img.width, this.img.height);
            }
        }
    }

    move() {
        switch (this.axis) {
            case "Y":
                if (this.img && this.posY >= 60 && this.posY + this.img.height <= 660) {
                    this.posY = this.app.mouseY - this.yOffset;
                }

                break;

            case "X":
                if (this.img && this.posX >= 313 && this.posX + this.img.width <= 913) {
                    this.posX = this.app.mouseX - this.xOffset;
                }
                break;

        }
    }

    setOffset() {
        this.xOffset = this.app.mouseX - this.posX;
        this.yOffset = this.app.mouseY - this.posY;

        this.locked = true;
    }

    setLocked(locked: boolean) {
        this.locked = locked;

        if (this.posX < 313) {
            this.posX = 313;
        } else if (this.img && this.posX + this.img.width > 913) {
            var gap = this.posX + this.img.width - 913;
            this.posX -= gap;
        }

        if (this.posY < 60) {
            this.posY = 60;
        } else if (this.img && this.posY + this.img.height > 660) {
            var gap = this.posY + this.img.height - 660;
            this.posY -= gap;
        }

    }

    getPosX() {
        return this.posX;
    }

    setPosX(posX: number) {
        this.posX = posX;
    }

    getPosY() {
        return this.posY;
    }

    setPosY(posY: number) {
        this.posY = posY;
    }

    getImg() {
        return this.img;
    }

    setImg(img: p5.Image) {
        this.img = img;
    }

    getSize() {
        return this.size;
    }

    setSize(size: number) {
        this.size = size;
    }

    isOver() {
        return this.over;
    }

    setOver(over: boolean) {
        this.over = over;
    }

    isLocked() {
        return this.locked;
    }

}


export default Brick;