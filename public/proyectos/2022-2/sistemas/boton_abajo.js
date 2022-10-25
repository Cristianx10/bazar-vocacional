class Boton_Abajo extends Botones {
    constructor(img) {
        super(img);
        this.imagen = img;
        this.name = "abajo";
  }

  mostrarBoton(index) {
    image(this.imagen, this.x * index + 100, this.y+12, 60, 60);
    this.index = index;
  }
}
