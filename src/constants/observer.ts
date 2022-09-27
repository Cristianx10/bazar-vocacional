import { Renderer } from "p5";
import { ResultadoPuntuacion, ResultadoUser, TStateProceso } from './resultados/types';
import { IEstado, RegistroFecha, IMedicionUnity } from './estados/EstadoManager';
import { ActivityLiteResult } from '../components/Actividad/config/ActividadTSLite';

const ObserverStyle = document.createElement("style");
ObserverStyle.innerHTML = `
* {
    box-sizing: border-box;
    margin: 0;
  }
  
  html,
  #root,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  body > main{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
  `

document.head.appendChild(ObserverStyle)


const CARRERAS = {
    INGENIERIA: "INGENIERIA",
    DISENO: "DISENO",
    CIENCIAS_NATURALES: "CIENCIAS_NATURALES",
    COMUNICACION: "COMUNICACION",
    PSICOLOGIA: "PSICOLOGIA",
    DERECHO: "DERECHO",
    CONTADURIA: "CONTADURIA",
    MUSICA: "MUSICA",
    MERCADEO: "MERCADEO",
    LICENCIATURA: "LICENCIATURA",
    LICENCIATURA_IDIOMAS: "LICENCIATURA_IDIOMAS",
    HUMANIDADES: "HUMANIDADES",
    ECONOCMIA: "ECONOCMIA",
    MEDICINA: "MEDICINA",
    BIOLOGIA: "BIOLOGIA",
    INGENIERIA_SISTEMAS: "INGENIERIA_SISTEMAS",
    DISENO_INDUSTRIAL: "DISENO_INDUSTRIAL",
    QUIMICA: "QUIMICA",
    DISENO_MODAS: "DISENO_MODAS",
    DISENO_INTERACTIVO: "DISENO_MEDIOS_INTERACTIVOS",
}

class ComunicacionIFrameReceptor {
    channel?: MessageEvent;
    fOnRecived?: (data: Object) => void;
    fOnInit?: () => void;
    inicializado;

    initIniciado;

    constructor() {
        this.inicializado = false;
        this.initIniciado = false;

        //Recibir mensajes
        window.addEventListener("message", this.onListener.bind(this));

    }

    onListener(e: MessageEvent) {

        this.inicializado = true;

        const data = e.data;


        this.onMessage(data);


        //Enviar mensajes
        this.channel = e;

        if (this.initIniciado === false) {
            this.initIniciado = true;
            this.fOnInit && this.fOnInit()
        }


    }

    onFinish() {
        window.removeEventListener("message", this.onListener.bind(this));
    }

    onInit(fOnInit?: () => void) {
        this.fOnInit = fOnInit;
    }

    onMessage(data: Object) {
        if (this.fOnRecived) {
            this.fOnRecived(data);
        }
    }

    setObserver(event: (data: Object) => void) {
        this.fOnRecived = event;
    }

    onSend(data: Object) {

        //Enviar Mensajes
        if (this.channel) {
            this.channel.ports[0].postMessage(data);
        }
    }

}


const observerScale = (container: HTMLElement, canvas: Renderer, sizeInit: { width: number, height: number }) => {


    const config = () => {
        const totalWidth = container.clientWidth;
        const totalHeight = container.clientHeight;

        const { width, height } = sizeInit;
        var clientWidth = width;
        var clientHeight = height;

        const ratioScaleX = totalWidth / clientWidth;
        const ratioScaleY = totalHeight / clientHeight;

        if (canvas) {


            //console.log("Encontro canvas", clientHeight * ratioScaleX, totalHeight, canvas.elt)

            if (clientHeight * ratioScaleX <= totalHeight) {
                canvas.style("width", "100%");
                canvas.style("height", "");

            } else {
                canvas.style("width", "");
                canvas.style("height", "100%");
            }
        }
    }


    window.addEventListener("resize", config)

    config();

}


class Tiempo {

    interval?: NodeJS.Timeout;

    timeObserves: (() => void)[];

    tiempo: number;

    constructor(tiempo?: number) {
        this.tiempo = tiempo !== undefined ? tiempo : 0;
        this.timeObserves = [];
    }

    addObserver(observer: () => void) {
        this.timeObserves.push(observer);
    }

    start() {
        this.interval = setInterval(() => {
            this.tiempo += 100;

            this.timeObserves.forEach(d => {
                d();
            })

        }, 100);
    }

    temporizador(tiempo: number, load?: () => void) {
        this.tiempo = tiempo;

        this.interval = setInterval(() => {
            this.tiempo -= 100;

            this.timeObserves.forEach(d => {
                d();
            })

            if (this.tiempo <= 0) {
                this.tiempo = 0;

                this.stop();
                load && load();
            }

        }, 100);
    }

    stop(load?: () => void) {
        if (this.interval) {
            clearInterval(this.interval);
            load && load();
        }
    }

    reset() {
        this.stop();
        this.tiempo = 0;
    }

    getTiempoFormat() {
        let minutos = Math.floor(this.tiempo / 60000);
        let segundos = Math.round(this.tiempo / 1000) - (minutos * 60)
        return {
            minutos, segundos
        }
    }

}



class EstadoManager<T = string> {

    timer: Tiempo;
    estados: Map<T, IEstado[]>;
    index: number;
    lastIndex: number;
    estado: TStateProceso

    date: RegistroFecha;

    constructor() {
        this.timer = new Tiempo();
        this.estados = new Map()
        this.estado = "NO INICIADA";

        this.index = -1;
        this.lastIndex = -1;

        this.date = {
            inicio: 0,
            fin: 0
        }

    }

    private fOnObserver?: (estados: { key: string, value: string | number | boolean }[]) => void;
    onObserver(fOnObserver?: (estados: { key: string, value: string | number | boolean }[]) => void) {
        this.fOnObserver = fOnObserver;
        if (this.fOnObserver) {
            const states = this.getAllLastStates();
            this.fOnObserver(states);
        }
    }

    getAllLastStates() {
        var states = [] as { key: string, value: string | number | boolean }[];
        this.estados.forEach((value, key: any) => {
            states.push({ value: value[value.length - 1].value, key })
        })
        return states;
    }

    initTime() {
        this.estado = "INICIADA";
        this.timer.start();
        this.date.inicio = new Date().getTime();
    }

    resetTime(load?: () => void) {
        load && load();
    }

    useState<K = (string | number | undefined)>(key: T): [() => K, (valor: K) => void] {

        const getState = (() => {
            return this.getLastState(key) as any;
        }) as () => K;

        const setState = (((valor: number | string) => {
            this.addState(key, valor)
        }) as any) as (valor: K) => void;

        return [getState.bind(this), setState.bind(this)]
    }

    getLastState(key: T) {
        var value: (number | string | boolean) | undefined = undefined;
        var mapState = this.estados.get(key) as IEstado[];
        if (mapState) {
            const lastState = mapState[mapState.length - 1]
            if (lastState) {
                value = lastState.value;
            }
        }
        return value;
    }

    addState(key: T, valor: number | string | boolean) {
        const value = valor;

        var mapState = this.estados.get(key) as IEstado[];
        if (mapState === undefined) {
            this.estados.set(key, []);
            mapState = this.estados.get(key) as IEstado[];
        }

        const lastState = mapState[mapState.length - 1]

        const time = this.timer.tiempo;

        if (lastState === undefined || lastState.value !== value) {
            this.index++;

            const estado: IEstado = {
                index: this.index + 0,
                time,
                value
            }

            this.lastIndex = this.index;

            mapState.push(estado)
        }

        if (this.fOnObserver) {
            const states = this.getAllLastStates();
            this.fOnObserver(states);
        }
    }

    stopTime() {
        this.timer.stop();
        this.date.fin = new Date().getTime();
        this.estado = "FINALIZADA";
    }

    toJSON(): IMedicionUnity {
        var estados: { key: string, values: IEstado[] }[] = [];
        this.estados.forEach((estado, index) => {
            var key = index as any;
            estados.push({ key, values: estado })
        })
        const lastIndex = this.lastIndex;
        const date = this.date;
        const estado = this.estado;
        const time = this.timer.tiempo;
        return {
            date,
            estado,
            lastIndex,
            estados,
            time
        };
    }

    loadData(data: IMedicionUnity) {

        this.timer.stop();

        this.timer = new Tiempo(data.time);
        this.estados = new Map();

        data.estados.forEach(({ key, values }) => {
            var estado = key as any;
            this.estados.set(estado, values);
        })

        this.index = data.lastIndex;
        this.lastIndex = data.lastIndex;
        this.estado = data.estado;

        this.date = data.date;

        if (this.estado === "INICIADA") {
            this.timer.start()
        }

    }
}

class ActividadTSLite {

    medicion: EstadoManager;
    resultados: ResultadoPuntuacion[];
    maximos: ResultadoPuntuacion[];
    informacion: ResultadoUser[];

    isFinalizado: boolean;

    comunicacion?: ComunicacionIFrameReceptor;

    fInit?: () => void;
    initEjecutado;

    private fOnFinish?: (result: ActivityLiteResult) => void;

    constructor() {
        this.initEjecutado = false;
        this.medicion = new EstadoManager();
        this.resultados = [];
        this.maximos = [];
        this.informacion = [];

        this.isFinalizado = false;
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

            const resultData = this.getData()

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
        const maximos = this.maximos;
        const informacion = this.informacion;
        const isFinalizado = this.isFinalizado;


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

const oActivity = new ActividadTSLite();
oActivity.init()


export default CARRERAS; 