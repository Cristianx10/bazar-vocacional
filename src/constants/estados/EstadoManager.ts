import Tiempo from "./Timer";
import EstadosManagerAnalitics from './EstadosManagerAnalitics';

export interface IEstado {
    index: number;
    time: number;
    value: number | string | boolean;
}

export interface IMedicionUnity {
    lastIndex: number;
    estados: {
        key: string;
        values: IEstado[];
    }[];
}

class EstadoManager<T = string> {

    timer: Tiempo;
    estados: Map<T, IEstado[]> = new Map();
    index = -1;
    lastIndex = -1;
    date: {
        inicio: number,
        fin: number
    }

    constructor() {
        this.timer = new Tiempo();
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
    }

    toJSON() {
        var estados: { key: string, values: IEstado[] }[] = [];
        this.estados.forEach((estado, index) => {
            var key = index as any;
            estados.push({ key, values: estado })
        })
        const lastIndex = this.lastIndex;
        return {
            lastIndex,
            estados
        };
    }


}

export default EstadoManager;