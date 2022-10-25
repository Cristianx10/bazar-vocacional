class Boton_Arriba extends Botones {
    constructor(img) {
        super(img);
        this.iamgen = img;
        this.name = "arriba"
    }

    mostrarBoton(index){
        
            image(this.imagen,this.x * index + 100, this.y+12, 60, 60);
            this.index = index;
        
    }
}