class Jugador {
    constructor(playerFil, playerCol,img){
        this.playerPosX = (playerCol * 40) + 20;
        this.playerPosY = (playerFil * 40) + 20;
        this.playerCol =  playerCol; 
        this.playerFil = playerFil;
        this.image = img;

        }

    init(){
        this.playerCol = 16;
        this.playerFil = 6;
        this.playerPosX = (this.playerCol * 40) + 20;
        this.playerPosY = (this.playerFil * 40) + 20;
        this.playerDir = 0;
    }

    show(){

       image(this.image,(windowWidth/4) - ( 75 * 2) + (this.playerCol * 60), (windowHeight/3) - (63 * 2) + (this.playerFil * 60), 30, 65);
    }

    updateLocation(){
        this.playerPosX = (this.playerCol * 40) + 20;
        this.playerPosY = (this.playerFil * 40) + 20;
    }

    setCol (col) {
        this.playerCol = col;
    }
    setFil (fil) {
        this.playerFil = fil;
    }

    getCol (){
        return this.playerCol;
    }

    getFil (){
        return this.playerFil;
    }
     /*    this.playerPosX = (playerCol - ( 85 * 2)) + (0 * 60);
        this.playerPosY = (playerFil - (60 * 2)) + (0 * 60);
        this.playerCol =  playerCol; 
        this.playerFil = playerFil;
        this.playerDir = playerDir;
        }

    init(){
        this.playerCol = (windowWidth/2);
        this.playerFil = (windowHeight/2);
        this.playerPosX = (this.playerCol - ( 85 * 2)) + (0 * 60);
        this.playerPosY = (this.playerFil - (60 * 2)) + (0 * 60);
    }

    show(){
        fill(255, 255, 0);
        ellipse(this.playerPosX, this.playerPosY, 30, 30);
    }

    updateLocation(){
        this.playerPosX = (this.playerCol - ( 85 * 2)) + (0 * 60);
        this.playerPosY = (this.playerFil - (60 * 2)) + (0 * 60);
    }

    getX () {
        return this.playerPosX;
    }
    getY () {
        return this.playerPosY;
    } */
}

/* class Jugador {
    constructor(pFil, pCol){

        this.xPos = (windowWidth/2) - ( 85 * 2) + 80;
        this.yPos = 5;
        this.pCol = 0;
        this.pFil = 0;
        this.vidas = 3; //esto se añade
        

    }
    mostrarProtagonista(){
    

    fill(255, 0, 0);
    ellipse(this.xPos, this.yPos, 30, 30);
    noFill();
}
updateLocation(){
    this.xPos = (this.pCol * 40) + 20; // validamos el mapa en la matriz
    this.yPos = (this.pFil * 40) + 20; // validamos el mapa en la matriz
}
reset(){
            
    this.pCol = 0; // pixeles
    this.pFil = 0; // pixeles
    this.xPos = 20;
    this.yPos = 20;
            
}
getX () {
    return this.xPos;
}
getY () {
    return this.yPos;
}
getPcol() {
    return this.pCol;
}

getPfil() {
    return this.pFil;
}

setXpos(nuevoXpos) {
    this.xPos = nuevoXpos;
}
getXpos() {
    return this.xPos;
}

setYpos(newYpos) {
    this.yPos = nuevoYpos;

}
getYpos() {
    return this.yPos;
}

setPcol(nuevoPcol) {
    this.pCol = nuevoPcol;
}

setPfil(nuevoPfil) {
    this.pFil = nuevoPfil;
}
} */