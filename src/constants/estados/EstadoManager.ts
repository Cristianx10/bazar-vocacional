import Tiempo from "./Timer";
import { TStateProceso } from '../resultados/types';

export interface IEstado {
    index: number;
    time: number;
    value: number | string | boolean;
}

export interface RegistroFecha {
    inicio: number,
    fin: number
}

export interface IMedicionUnity {
    lastIndex: number;
    date: RegistroFecha;
    estado: TStateProceso;
    time: number;
    estados: {
        key: string;
        values: IEstado[];
    }[];
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

        if(this.estado === "INICIADA"){
            this.timer.start()
        }

    }
}

export default EstadoManager;