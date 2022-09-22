class Square {
    constructor(posx, posy, color, size, round, number, type, nunito) {

        /* Types
        1 is for start 
        2 is for normal square
        3 is for end square
        4 is for in progress
        5 is for completed
        */
        this.nunito = nunito;
        this.posx = posx;
        this.posy = posy;
        this.size = size;
        this.round = round;
        this.color = color;
        this.type = type;
        this.number = number;
    }

    increaseSize(map) {
        //const {image,mouseX, mouseY, textSize, textAlign, text, floor, millis, rectMode,CENTER,fill} = this.app;

        if (map == 2) {
            if (this.posx - 60 < mouseX && mouseX < this.posx - 60 + this.size && this.posy - 60 < mouseY && mouseY < this.posy - 60 + this.size) {
                this.size = 130;
            } else {
                this.size = 120;
            }
        }

        if (map == 5) {
            if (this.posx - 40 < mouseX && mouseX < this.posx - 40 + this.size && this.posy - 40 < mouseY && mouseY < this.posy - 40 + this.size) {
                this.size = 90;
            } else {
                this.size = 80;
            }
        }

        if (map == 6) {
            if (this.posx - 34 < mouseX && mouseX < this.posx - 34 + this.size && this.posy - 34 < mouseY && mouseY < this.posy - 34 + this.size) {
                this.size = 77;
            } else {
                this.size = 67;
            }
        }

        if (map == 7) {
            if (this.posx - 34 < mouseX && mouseX < this.posx - 34 + this.size && this.posy - 34 < mouseY && mouseY < this.posy - 34 + this.size) {
                this.size = 57;
            } else {
                this.size = 50;
            }
        }

    }

    drawSquare(map) {
        //const {image,mouseX, mouseY, textSize, textAlign, text, floor, millis, rectMode,CENTER,square,noStroke,textFont,fill} = this.app;
        if (map == 2) {
            rectMode(CENTER);
            //Color
            fill(this.color);
            noStroke();
            square(this.posx, this.posy, this.size, this.round);

            //Text
            fill(255);
            textFont(this.nunito);

            if (this.number == 0) {
                fill("#483B51");
            }

            textSize(this.size / 2);
            if (this.number >= 10) {
                text(this.number, this.posx - this.size / 2 + 25, this.posy + 20);
            } else {
                text(this.number, this.posx - this.size / 2 + 45.5, this.posy + 20);
            }

        }

        if (map == 5) {
            rectMode(CENTER);
            //Color
            fill(this.color);
            noStroke();
            square(this.posx, this.posy, this.size, this.round);

            //Text
            fill(255);
            textFont(this.nunito);


            if (this.number == 0) {
                fill("#483B51");
            }

            textSize(this.size / 2);
            text(this.number, this.posx, this.posy + 15);
        }

        if (map == 6) {
            rectMode(CENTER);
            //Color
            fill(this.color);
            noStroke();
            square(this.posx, this.posy, this.size, this.round);

            //Text
            fill(255);
            textFont(this.nunito);


            if (this.number == 0) {
                fill("#483B51");
            }

            textSize(this.size / 2);
            text(this.number, this.posx, this.posy + 13);
        }

        if (map == 7) {
            rectMode(CENTER);
            //Color
            fill(this.color);
            noStroke();
            square(this.posx, this.posy, this.size, this.round);

            //Text
            fill(255);
            textFont(this.nunito);


            if (this.number == 0) {
                fill("#483B51");
            }

            textSize(this.size / 2);
            text(this.number, this.posx, this.posy + 10);
        }



    }

    changeColor(color) {
        this.color = color;
    }

    changeType(type) {
        this.type = type;
    }

    getPosx() {
        return this.posx;
    }

    getPosy() {
        return this.posy;
    }
    getSize() {
        return this.size;
    }

    getNumber() {
        return this.number;
    }

    getType() {
        return this.type;
    }

    getColor() {
        return this.color;
    }
}

/*
const c = new ComunicacionIFrameReceptor();

c.onInit(()=>{
    c.setObserver((e) => {
        document.querySelector("body").innerHTML = JSON.stringify(e);
    })
    
    c.onSend("Esto es una respuesta");
})
*/
