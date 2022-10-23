import EstadoManager from '../../../constants/estados/EstadoManager';
import { ResultadoPuntuacion, ResultadoUser } from '../../../constants/resultados/types';
import ComunicacionIFrameReceptor from '../../../componentsTS/ComunicacionIFrame/ComunicacionIframeReceptor';
import { IMedicionUnity } from '../../../constants/estados/EstadoManager';
import { IComunicacionIframaMessage } from '../../../componentsTS/ComunicacionIFrame/index';
import ListGeneral from '../../../constants/simulations/ListGeneral';
import ActividadTS from './ActividadTS';

export interface ActivityLiteResult {
    data: IMedicionUnity;
    resultados: ResultadoPuntuacion[];
    maximos: ResultadoPuntuacion[];
    informacion: ResultadoUser[];
    isFinalizado: boolean;
}

class ActividadTSLite {

    actividad?: ActividadTS;

    medicion: EstadoManager;
    resultados: ResultadoPuntuacion[];
    maximos: ResultadoPuntuacion[];
    informacion: ResultadoUser[];

    isFinalizado: boolean;

    comunicacion?: ComunicacionIFrameReceptor;

    fInit?: () => void;
    initEjecutado;

    private fOnFinish?: (result: ActivityLiteResult) => void;

    constructor(actividad?: ActividadTS) {
        this.initEjecutado = false;
        this.medicion = new EstadoManager();
        this.resultados = [];
        this.maximos = [];
        this.informacion = [];

        this.isFinalizado = false;
        this.actividad = actividad;
    }

    initIframe(load?: () => void) {


        this.comunicacion = new ComunicacionIFrameReceptor();

        this.comunicacion.setObserver((data: any) => {

            if (typeof data === "string") {
                if (data === "START_COMUNICATION") {

                }
            } else {
                if (data.type === "GET_ACTIVITY") {
                    this.loadData(data.data)


                    if (this.fInit && this.comunicacion && this.comunicacion.inicializado && this.initEjecutado === false) {
                        this.initEjecutado = true;
                        this.fInit();
                    }
                }

            }


        })

        this.comunicacion.onInit(() => {

            if (this.comunicacion) {
                this.comunicacion.onSend("GET_ACTIVITY")
            }

            load && load();
        })

    }

    setInit(fInit?: () => void) {
        this.fInit = fInit;

        if (this.fInit && this.comunicacion && this.comunicacion.inicializado && this.initEjecutado === false) {
            this.initEjecutado = true;
            this.fInit();
        }
    }

    init(load?: () => void, type?: "INTERNA" | "EXTERNA") {
        this.medicion.initTime();
        if (type === "EXTERNA" || type === undefined) {
            this.initIframe(load);
        } else {
            load && load()
        }
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

            const resultData = this.getData();

            if (this.comunicacion) {
                this.comunicacion.onSend({
                    type: "FINISH_ACTIVITY",
                    data: resultData
                })

                this.comunicacion.onFinish();
            }

            if (this.fOnFinish) {
                this.fOnFinish(resultData);
            }

        }
    }

    onFinish(fOnFinish?: (result: ActivityLiteResult) => void) {
        this.fOnFinish = fOnFinish;
    }

    onSaveData() {
        if (this.comunicacion) {

            const resultData = this.getData()

            this.comunicacion.onSend({
                type: "SAVE_ACTIVITY",
                data: resultData
            })

        }
    }

    getData(): ActivityLiteResult {
        const data = this.medicion.toJSON();
        const resultados = this.resultados;
        var maximos = this.maximos;
        const informacion = this.informacion;
        const isFinalizado = this.isFinalizado;
        

        if (maximos.length === 0 && this.actividad) {
            var info = ListGeneral.get(this.actividad.info.UID);
            if (info) {
                maximos = info.defaultMaximos;
            }
        }


        const resultData: ActivityLiteResult = {
            data,
            resultados,
            maximos,
            informacion,
            isFinalizado
        }
        return resultData;
    }

    loadData(data: ActivityLiteResult) {

        this.medicion = new EstadoManager();
        this.medicion.loadData(data.data);

        this.resultados = data.resultados;
        this.maximos = data.maximos;
        this.informacion = data.informacion;

        this.isFinalizado = data.isFinalizado;
    }

    redirect(url: string) {
        this.onSaveData();
        window.location.href = url;
    }

}


export default ActividadTSLite;