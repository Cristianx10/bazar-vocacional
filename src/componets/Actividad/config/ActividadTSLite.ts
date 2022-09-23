import EstadoManager from '../../../constants/estados/EstadoManager';
import { ResultadoPuntuacion, ResultadoUser } from '../../../constants/resultados/types';
import ComunicacionIFrameReceptor from '../../../componentsTS/ComunicacionIFrame/ComunicacionIframeReceptor';


class ActividadTSLite {

    medicion: EstadoManager;
    resultados: ResultadoPuntuacion[];
    maximos: ResultadoPuntuacion[];
    informacion: ResultadoUser[];

    isFinalizado: boolean;

    comunicacion: ComunicacionIFrameReceptor;

    constructor() {
        this.medicion = new EstadoManager();
        this.resultados = [];
        this.maximos = [];
        this.informacion = [];

        this.isFinalizado = false;

        this.comunicacion = new ComunicacionIFrameReceptor();
    }

    init() {
        this.medicion.initTime();
        this.comunicacion.onInit(() => { })
    }

    getState(key: string) {
        return this.medicion.useState(key)
    }

    addState(key: string, valor: string | number | boolean) {
        this.medicion.addState(key, valor)
    }

    addInformation(informacion: ResultadoUser[]) {
        this.informacion = [...this.informacion, ...informacion];
    }

    setInformation(informacion: ResultadoUser[]) {
        this.informacion = informacion;
    }


    addResultMaximo(maximo: ResultadoPuntuacion[]) {
        var maximoTemp = new Map<string, number>()
        maximo.forEach(({ id, value }) => {
            maximoTemp.set(id, value);
        });

        var maximoResult: ResultadoPuntuacion[] = []
        maximoTemp.forEach((value, key) => {
            maximoResult.push({ id: key, value })
        })

        this.maximos = maximoResult;

    }

    addResult(resultados: ResultadoPuntuacion[]) {
        var resultadoTemp = new Map<string, number>()
        resultados.forEach(({ id, value }) => {
            resultadoTemp.set(id, value);
        });

        var resultadoResult: ResultadoPuntuacion[] = []
        resultadoTemp.forEach((value, key) => {
            resultadoResult.push({ id: key, value })
        })

        this.resultados = resultadoResult;
    }


    finish() {

        if (this.isFinalizado === false) {
            this.isFinalizado = true;
            this.medicion.stopTime();



            const data = this.medicion.toJSON();
            const resultados = this.resultados;
            const maximos = this.maximos;
            const informacion = this.informacion;


            const resultData = {
                data,
                resultados,
                maximos,
                informacion
            }


            this.comunicacion.onSend({
                type: "FINISH_ACTIVITY",
                data: resultData
            })

            this.comunicacion.onFinish();

        }
    }

}

const oActivity = new ActividadTSLite();

export default ActividadTSLite;