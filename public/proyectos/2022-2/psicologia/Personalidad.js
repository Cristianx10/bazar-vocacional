class personalidad {

    constructor(img, tipo, etiqueta, font, posX, posY) {

        this.img = img;
        this.tipo = tipo;
        this.dragging = false;
        this.lock = false;
        this.activo = true;
        this.font = font;
        this.etiqueta = etiqueta;

        this.lienzox = -2000;
        this.lienzoy = -2000;

        //original
        this.originX = posX
        this.originY = posY

        //rastreo
        this.posX = posX;
        this.posY = posY;

        //casilla
        this.posCasillax = 0;
        this.posCasillaY = 0;

    }

    display() {

        

            if (!this.lock && !this.dragging) {

            imageMode(CENTER);
            image(this.img, this.originX, this.originY)
            imageMode(CORNER);


            fill(0);
            textSize(40);
            textAlign(CENTER, CENTER);
            text(this.etiqueta, this.originX, this.originY + 110);


        }

        if (this.lock && !this.dragging) {

            imageMode(CENTER);
            image(this.img, this.posCasillax, this.posCasillaY)
            imageMode(CORNER);


            fill(0);
            textSize(40);
            textAlign(CENTER, CENTER);
            text(this.etiqueta, this.posCasillax, this.posCasillaY + 110);


        }


        if (this.dragging) {
            imageMode(CENTER);
            image(this.img, this.posX, this.posY)
            imageMode(CORNER);


            fill(0);
            textSize(40);
            textAlign(CENTER, CENTER);
            text(this.etiqueta, this.posX, this.posY + 110);
        }

        // rect(this.posX, this.posY, 125);



    }

    setCasilla(casilla) {
        this.casilla = casilla

    }
    getCasilla() {
        return this.casilla
    }

    setLock() {
        this.lock = true;
    }
    
    setUnlock() {
        this.lock = false;
    }

    getLock() {
        return this.lock;
    }

    setDragging() {
        this.dragging = true;
    }

    setNotDragging() {
        this.dragging = false;
    }

    getDragging() {
        return this.dragging
    }

    //    Rastreo
    setPositions(x, y) {
        this.posX = x;
        this.posY = y;
    }

    // casilla
    setOrigin(x, y) {
        this.posCasillax = x;
        this.posCasillaY = y;
    }

    // origen
    set_Origin(x, y) {

        this.originX = x;
        this.originY = y;
    }


    getPosX() {

        if (this.activo) {         

        if (!this.lock && !this.dragging) {
            return this.originX;
        }

        if (this.lock && !this.dragging) {
            return this.posCasillax;
        }

        if (this.dragging) {
            return this.posX;
        }
    }
}
    getPosY() {
        
        if (!this.lock && !this.dragging) {
            return this.originY;
        }

        if (this.lock && !this.dragging) {
            return this.posCasillaY;
        }

        if (this.dragging) {
            return this.posY;
        }

    }

    turnActivo(){
        this.activo = true
    }

    turnNoActivo(){
        this.activo = false 
    }

    getTipo() {
        return this.tipo;
    }
}