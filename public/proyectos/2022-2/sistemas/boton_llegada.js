class Boton_Llegada extends Botones {
    constructor(img) {
        super(img);
        this.iamgen = img;
        this.name = "llegada"
    }

    mostrarBoton(index){
        
            image(this.imagen,this.x * index + 100, this.y+12, 60, 60);
            this.index = index;
        
    }
}