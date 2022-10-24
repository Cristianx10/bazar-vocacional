import p5 from "p5";
import ProcessingImg from "../../../../componentsTS/Processing/config/ProcessingImg";
import ActividadTSLite from '../../../../components/Actividad/config/ActividadTSLite';

class Logica {

    app: p5;
    img: ProcessingImg;
    oActivity: ActividadTSLite;

    constructor(app: p5, oActivity: ActividadTSLite) {
        this.app = app;
        this.img = new ProcessingImg(this.app);
        this.oActivity = oActivity;
    }

    onInicial() { }
    onFinal() {
        // this.propiedades.vidas = this.vidas;
        // this.propiedades.puntaje = this.puntaje;
    }

    onProgress(s: number, m: number) {
        /*     this.tiempo = s + (m * 60);
             if (this.vidas <= 0) {
                 /*    if (this.processing) {
                         this.processing.continuar();
                     }*/
        //}

    }

}

export default Logica;