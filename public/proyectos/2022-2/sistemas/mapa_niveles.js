class mapa_niveles {
  constructor() {
    this.escaque = [];
    this.posX = 20;
    this.posY = 20;
    this.squareColor = color(255);
    this.squareColor.setAlpha(20);
    this.squareColor2 = color(255);
    this.squareColor2.setAlpha(200);
  }

  arregloEscaque() {
    for (let index = 0; index < 12; index++) {
      this.escaque.push(new Array(12));
    }

    for (let fil = 0; fil < 7; fil++) {
      for (let col = 0; col < 12; col++) {
        this.escaque[fil][col] = 0;
      }
    }
    //console.log(this.escaque);
  }

  /*

    arregloEscaque2(){
        for (let index = 0; index < 4; index++) {
            this.escaque2.push(new Array(4));
        }

        for (let fil = 0; fil < 5; fil++) {
            for(let col = 0; col < 6; col++){
                this.escaque2[fil][col] = 0;
            }
        }
    }*/

  //En este punto se configuran los espacios por donde pasará el personaje
  terrenoPrimerNivel(nivel1) {
    for (let fil = 0; fil < 7; fil++) {
      for (let col = 0; col < 12; col++) {
        switch (nivel1) {
          //primer nivel
          case 0:
            this.escaque[0][0] = 1;
            this.escaque[0][1] = 1;
            this.escaque[0][2] = 1;
            this.escaque[0][3] = 1;
            this.escaque[0][4] = 1;
            this.escaque[0][5] = 1;
            this.escaque[0][6] = 1;
            this.escaque[0][7] = 1;
            this.escaque[0][8] = 1;
            this.escaque[0][9] = 1;
            this.escaque[0][10] = 1;
            this.escaque[0][11] = 1;

            this.escaque[1][0] = 1;
            this.escaque[1][1] = 1;
            this.escaque[1][2] = 1;
            this.escaque[1][3] = 1;
            this.escaque[1][4] = 1;
            this.escaque[1][5] = 1;
            this.escaque[1][6] = 1;
            this.escaque[1][7] = 1;
            this.escaque[1][8] = 1;
            this.escaque[1][9] = 1;
            this.escaque[1][11] = 1;
            this.escaque[1][10] = 1;

            this.escaque[2][0] = 1;
            this.escaque[2][1] = 1;
            this.escaque[2][11] = 1;

            this.escaque[3][0] = 1;
            this.escaque[3][1] = 1;
            this.escaque[3][3] = 1;
            this.escaque[3][4] = 1;
            this.escaque[3][5] = 1;
            this.escaque[3][6] = 1;
            this.escaque[3][7] = 1;
            this.escaque[3][8] = 1;
            this.escaque[3][9] = 1;
            this.escaque[3][11] = 1;

            this.escaque[4][0] = 1;
            this.escaque[4][1] = 1;
            this.escaque[4][3] = 1;
            this.escaque[4][4] = 1;
            this.escaque[4][5] = 1;
            this.escaque[4][6] = 1;
            this.escaque[4][7] = 1;
            this.escaque[4][8] = 1;
            this.escaque[4][9] = 1;
            this.escaque[4][11] = 1;

            this.escaque[5][0] = 1;
            this.escaque[5][1] = 1;
            this.escaque[5][11] = 1;

            this.escaque[6][0] = 1;
            this.escaque[6][1] = 1;
            this.escaque[6][2] = 1;
            this.escaque[6][3] = 1;
            this.escaque[6][4] = 1;
            this.escaque[6][5] = 1;
            this.escaque[6][6] = 1;
            this.escaque[6][7] = 1;
            this.escaque[6][8] = 1;
            this.escaque[6][9] = 1;
            this.escaque[6][10] = 2;
            this.escaque[6][11] = 1;

            break;

          //segudno nivel
          case 1:

            this.escaque[0][0] = 1;
            this.escaque[0][1] = 1;
            this.escaque[0][2] = 1;
            this.escaque[0][3] = 1;
            this.escaque[0][4] = 1;
            this.escaque[0][5] = 1;
            this.escaque[0][6] = 1;
            this.escaque[0][7] = 1;
            this.escaque[0][8] = 1;
            this.escaque[0][9] = 1;
            this.escaque[0][10] = 1;
            this.escaque[0][11] = 1;
          
            this.escaque[1][0] = 1;
            this.escaque[1][9] = 1;
            this.escaque[1][10] = 1;
            this.escaque[1][11] = 1;
            
            this.escaque[2][0] = 1;
            this.escaque[2][1] = 1;
            this.escaque[2][3] = 1;
            this.escaque[2][4] = 1;
            this.escaque[2][6] = 1;
            this.escaque[2][7] = 1;
            this.escaque[2][9] = 1;
            this.escaque[2][10] = 1;
            this.escaque[2][11] = 1;

            this.escaque[3][0] = 1;
            this.escaque[3][1] = 1;
            this.escaque[3][3] = 1;
            this.escaque[3][4] = 1;
            this.escaque[3][6] = 1;
            this.escaque[3][7] = 1;
            this.escaque[3][9] = 1;
            this.escaque[3][10] = 1;
            this.escaque[3][11] = 1;

            this.escaque[4][0] = 1;
            this.escaque[4][1] = 1;
            this.escaque[4][3] = 1;    
            this.escaque[4][7] = 1;  
            this.escaque[4][9] = 1;              
            this.escaque[4][10] = 1;    
            this.escaque[4][11] = 1;    

            this.escaque[5][0] = 1;
            this.escaque[5][1] = 1;
            this.escaque[5][5] = 1; 
            this.escaque[5][9] = 2; 
            this.escaque[5][10] = 1; 
            this.escaque[5][11] = 1; 

            this.escaque[6][0] = 1;
            this.escaque[6][1] = 1;
            this.escaque[6][2] = 1;
            this.escaque[6][3] = 1;
            this.escaque[6][4] = 1;
            this.escaque[6][5] = 1;
            this.escaque[6][6] = 1;
            this.escaque[6][7] = 1;
            this.escaque[6][8] = 1;
            this.escaque[6][9] = 1;
            this.escaque[6][10] = 1;
            this.escaque[6][11] = 1;
           

            break;

          //tercer nivel

          case 2:
            this.escaque[0][0] = 1;
            this.escaque[0][1] = 1;
            this.escaque[0][2] = 1;
            this.escaque[0][3] = 1;
            this.escaque[0][4] = 1;
            this.escaque[0][5] = 1;
            this.escaque[0][6] = 1;
            this.escaque[0][7] = 1;
            this.escaque[0][8] = 1;
            this.escaque[0][9] = 1;
            this.escaque[0][10] = 1;
            this.escaque[0][11] = 1;

            this.escaque[1][0] = 1;
            this.escaque[1][9] = 1;
            this.escaque[1][10] = 1;
            this.escaque[1][11] = 1;
           
            this.escaque[2][0] = 1;
            this.escaque[2][1] = 1;
            this.escaque[2][2] = 1;
            this.escaque[2][3] = 1;
            this.escaque[2][5] = 1;
            this.escaque[2][6] = 1;
            this.escaque[2][7] = 1;
            this.escaque[2][9] = 1;
            this.escaque[2][10] = 1;
            this.escaque[2][11] = 1;
      
            this.escaque[3][0] = 1;
            this.escaque[3][1] = 1;
            this.escaque[3][2] = 1;
            this.escaque[3][3] = 1;
            this.escaque[3][6] = 1;
            this.escaque[3][7] = 1;
            this.escaque[3][9] = 1;
            this.escaque[3][10] = 1;
            this.escaque[3][11] = 1;

            this.escaque[4][0] = 1;
            this.escaque[4][1] = 1;
            this.escaque[4][2] = 1;
            this.escaque[4][3] = 1;
            this.escaque[4][4] = 1;
            this.escaque[4][7] = 1;
            this.escaque[4][9] = 1;
            this.escaque[4][10] = 1;
            this.escaque[4][11] = 1;

            this.escaque[5][0] = 1;
            this.escaque[5][1] = 1;
            this.escaque[5][2] = 1;
            this.escaque[5][3] = 1;
            this.escaque[5][4] = 1;
            this.escaque[5][5] = 1;
            this.escaque[5][8] = 2;
            this.escaque[5][9] = 1;
            this.escaque[5][10] = 1;
            this.escaque[5][11] = 1;

            this.escaque[6][0] = 1;
            this.escaque[6][1] = 1;
            this.escaque[6][2] = 1;
            this.escaque[6][3] = 1;
            this.escaque[6][4] = 1;
            this.escaque[6][5] = 1;
            this.escaque[6][6] = 1;
            this.escaque[6][7] = 1;
            this.escaque[6][8] = 1;
            this.escaque[6][9] = 1;
            this.escaque[6][10] = 1;
            this.escaque[6][11] = 1;
            break;
          //cuarto nivel

          case 3:
            this.escaque[0][0] = 1;
            this.escaque[0][1] = 1;
            this.escaque[0][2] = 1;
            this.escaque[0][3] = 1;
            this.escaque[0][4] = 1;
            this.escaque[0][5] = 1;
            this.escaque[0][6] = 1;
            this.escaque[0][7] = 1;
            this.escaque[0][8] = 1;
            this.escaque[0][9] = 1;
            this.escaque[0][10] = 1;
            this.escaque[0][11] = 1;
            this.escaque[0][12] = 1;

            this.escaque[1][0] = 1;
            this.escaque[1][1] = 1;
            this.escaque[1][2] = 1;
            this.escaque[1][3] = 1;
            this.escaque[1][4] = 1;
            this.escaque[1][8] = 1;
            this.escaque[1][9] = 1;
            this.escaque[1][10] = 1;
            this.escaque[1][11] = 1;

            this.escaque[2][0] = 1;
            this.escaque[2][6] = 1;
            this.escaque[2][8] = 1;
            this.escaque[2][10] = 1;
            this.escaque[2][11] = 1;

            this.escaque[3][0] = 1;
            this.escaque[3][2] = 1;
            this.escaque[3][2] = 1;
            this.escaque[3][4] = 1;
            this.escaque[3][6] = 1;
            this.escaque[3][8] = 1;
            this.escaque[3][10] = 1;
            this.escaque[3][11] = 1;

            this.escaque[4][0] = 1;
            this.escaque[4][2] = 1;
            this.escaque[4][4] = 1;
            this.escaque[4][10] = 1;
            this.escaque[4][11] = 1;

            this.escaque[5][0] = 1;
            this.escaque[5][1] = 1;
            this.escaque[5][2] = 1;
            this.escaque[5][6] = 1;
            this.escaque[5][7] = 1;
            this.escaque[5][8] = 1;
            this.escaque[5][9] = 1;
            this.escaque[5][10] = 1;
            this.escaque[5][11] = 1;
            this.escaque[5][12] = 1;

            this.escaque[6][0] = 1;
            this.escaque[6][1] = 1;
            this.escaque[6][2] = 1;
            this.escaque[6][3] = 1;
            this.escaque[6][4] = 1;
            this.escaque[6][5] = 1;
            this.escaque[6][6] = 1;
            this.escaque[6][7] = 1;
            this.escaque[6][8] = 1;
            this.escaque[6][9] = 1;
            this.escaque[6][10] = 1;
            this.escaque[6][11] = 1;
            this.escaque[6][12] = 1;

            this.escaque[2][9] = 2;

            break;

          //quinto nivel

          case 4:
            this.escaque[0][0] = 1;
            this.escaque[0][1] = 1;
            this.escaque[0][2] = 1;
            this.escaque[0][3] = 1;
            this.escaque[0][4] = 1;
            this.escaque[0][5] = 1;
            this.escaque[0][6] = 1;
            this.escaque[0][7] = 1;
            this.escaque[0][8] = 1;
            this.escaque[0][9] = 1;
            this.escaque[0][10] = 1;
            this.escaque[0][11] = 1;
            this.escaque[0][12] = 1;

            this.escaque[1][0] = 1;
            this.escaque[1][4] = 1;
            this.escaque[1][5] = 1;
            this.escaque[1][6] = 1;
            this.escaque[1][7] = 1;
            this.escaque[1][8] = 1;
            this.escaque[1][9] = 1;
            this.escaque[1][10] = 1;
            this.escaque[1][11] = 1;

            this.escaque[2][0] = 1;
            this.escaque[2][2] = 1;
            this.escaque[2][3] = 1;
            this.escaque[2][4] = 1;
            this.escaque[2][5] = 1;
            this.escaque[2][6] = 1;
            this.escaque[2][7] = 1;
            this.escaque[2][8] = 1;
            this.escaque[2][9] = 1;
            this.escaque[2][10] = 1;
            this.escaque[2][11] = 1;

            this.escaque[3][0] = 1;

            this.escaque[3][3] = 1;
            this.escaque[3][4] = 0;
            this.escaque[3][9] = 1;
            this.escaque[3][10] = 1;
            this.escaque[3][11] = 1;

            this.escaque[4][0] = 1;
            this.escaque[4][1] = 1;
            this.escaque[4][3] = 1;
            this.escaque[4][5] = 1;
            this.escaque[4][6] = 1;
            this.escaque[4][7] = 1;
            this.escaque[4][9] = 1;
            this.escaque[4][10] = 1;
            this.escaque[4][11] = 1;

            this.escaque[5][0] = 1;
            this.escaque[5][1] = 1;
            this.escaque[5][10] = 2; //GANO
            this.escaque[5][11] = 1;

            this.escaque[6][0] = 1;
            this.escaque[6][1] = 1;
            this.escaque[6][2] = 1;
            this.escaque[6][3] = 1;
            this.escaque[6][4] = 1;
            this.escaque[6][5] = 1;
            this.escaque[6][6] = 1;
            this.escaque[6][7] = 1;
            this.escaque[6][8] = 1;
            this.escaque[6][9] = 1;
            this.escaque[6][10] = 1;
            this.escaque[6][11] = 1;
            this.escaque[6][12] = 1;
            


            break;

          //sexto nivel

          case 5:
            this.escaque[0][0] = 1;
            this.escaque[0][1] = 1;
            this.escaque[0][2] = 1;
            this.escaque[0][3] = 1;
            this.escaque[0][4] = 1;
            this.escaque[0][5] = 1;
            this.escaque[0][6] = 1;
            this.escaque[0][7] = 1;
            this.escaque[0][8] = 1;
            this.escaque[0][9] = 1;
            this.escaque[0][10] = 1;
            this.escaque[0][11] = 1;
            this.escaque[0][12] = 1;

            this.escaque[1][0] = 1;
            this.escaque[1][3] = 1;
            this.escaque[1][4] = 1;
            this.escaque[1][10] = 1;
            this.escaque[1][11] = 1;

            this.escaque[2][0] = 1;
            this.escaque[2][2] = 1;
            this.escaque[2][6] = 1;
            this.escaque[2][8] = 1;
            this.escaque[2][9] = 1;
            this.escaque[2][10] = 1;
            this.escaque[2][11] = 1;

            this.escaque[3][0] = 1;
            this.escaque[3][2] = 1;
            this.escaque[3][4] = 1;
            this.escaque[3][6] = 1;
            this.escaque[3][9] = 1;
            this.escaque[3][10] = 1;
            this.escaque[3][11] = 1;

            this.escaque[4][0] = 1;
            this.escaque[4][2] = 1;
            this.escaque[4][4] = 1;
            this.escaque[4][6] = 1;
            this.escaque[4][7] = 1;
            this.escaque[4][9] = 1;
            this.escaque[4][10] = 1;
            this.escaque[4][11] = 1;


            this.escaque[5][0] = 1;
            this.escaque[5][9] = 1;
            this.escaque[5][10] = 1;
            this.escaque[5][11] = 1;

            this.escaque[6][0] = 1;
            this.escaque[6][1] = 1;
            this.escaque[6][2] = 1;
            this.escaque[6][3] = 1;
            this.escaque[6][4] = 1;
            this.escaque[6][5] = 1;
            this.escaque[6][6] = 1;
            this.escaque[6][7] = 1;
            this.escaque[6][8] = 1;
            this.escaque[6][9] = 1;
            this.escaque[6][10] = 1;
            this.escaque[6][11] = 1;
            this.escaque[6][12] = 1;

            this.escaque[1][2] = 2;

            break;
        }
      }
    }
  }

  mostrar(pantalla1) {
    // pintamos basados en los valores de la matriz
    for (let fil = 0; fil < 7; fil++) {
      for (let col = 0; col < 12; col++) {
        if (this.escaque[fil][col] === 0) {
          //Zona para caminar
          fill(this.squareColor2);
        } else if (this.escaque[fil][col] === 1) {
          //Paredes
          fill(this.squareColor);
        } else if (this.escaque[fil][col] === 2) {
          //Meta
          fill(255);
        }
        noStroke();
        rect(
          windowWidth / 4 - 80 * 2 + col * 60,
          windowHeight / 3 - 55 * 2 + fil * 60,
          50,
          50
        );
      }
    }
  }

  reiniciar() {
    this.escaque = [];
    this.arregloEscaque();
    //  this.arregloEscaque2();
  }

  getLocacion(newFil, newCol) {
    if (newFil < 0 || newFil > 6 || newCol < 0 || newCol > 11) {
      newFil = 0;
      newCol = 0;
    }
    return this.escaque[newFil][newCol];
  }
}
