class Botones {
  constructor(img) {
    //añañaiiii
    this.botonesAccion = [];
    this.index = 0;
    this.x = 80;
    this.y = windowHeight - 110;
    this.imagen = img;
    // this.imageBotonInicio = new X('src/PLAY.png')
    this.posX = windowWidth / 2 - 20;
    this.posY = windowHeight / 2 + 205;
    this.posXTrash = windowWidth / 1.18;
    this.posYTrash = windowHeight / 2 + 205;
  }

  mostrarBoton() {}

  //boton para iniciar el juego (recorrido del arreglo)
  botonInicioJuego() {
    image(this.imagen, this.posX, this.posY, 60, 60);
  }

  botonBorrarComandos() {
    image(this.imagen, this.posXTrash, this.posYTrash, 60, 60);
  }

  //funcion que pinta los botones del segundo arreglo
  pintarBotonesAccion(index) {
    if (index < 4) {
      image(this.imagen, this.x * index + 1090, this.y - 540, 60, 60);
    } else if (index >= 4 && index < 8) {
      image(this.imagen, this.x * index + 770, this.y - 470, 60, 60);
    } else if (index >= 4 && index < 12) {
      image(this.imagen, this.x * index + 450, this.y - 400, 60, 60);
    } else if (index >= 12 && index < 16) {
      image(this.imagen, this.x * index + 130, this.y - 330, 60, 60);
    } else if (index >= 16 && index < 20) {
      image(this.imagen, this.x * index - 190, this.y - 260, 60, 60);
    } else if (index >= 20 && index < 24) {
      image(this.imagen, this.x * index - 510, this.y - 190, 60, 60);
    }
  }

  getX() {
    return this.x * this.index + 100;
  }

  getY() {
    return this.y;
  }
}
