
class Boton_Der extends Botones {
    constructor(img) {
        super(img);
        this.iamgen = img;
        this.name = "derecha"
    }

    mostrarBoton(index){
            image(this.iamgen,this.x * index + 100, this.y+12, 60, 60);
            this.index = index;
        
    }
}