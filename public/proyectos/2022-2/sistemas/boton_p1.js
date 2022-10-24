class Boton_P1 extends Botones {
    constructor(img){
        super(img)
        this.name = "rep_p1"
        this.imagen = img;
        // this.imagen = new loadImage('src/P1.png')
    }

    mostrarBoton(index){
            image(this.imagen,this.x * index + 100, this.y+12, 60, 60);
            this.index = index;
        
    }
}