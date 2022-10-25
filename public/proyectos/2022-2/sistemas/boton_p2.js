class Boton_P2 extends Botones {
    constructor(img){
        super(img)
        this.name = "rep_p2"
        this.imagen = img;
        // this.imagen = new loadImage('src/P1.png')
    }

    mostrarBoton(index){
            image(this.imagen,this.x * index + 120, this.y+12, 60, 60);
            this.index = index;
        
    }
}