import Tiempo from "./Timer";

interface IEstado {
    index: number;
    time: number;
    value: number | string | boolean;
}

interface IMedicion {
    index: number,
    estados: IEstado[]
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

    constructor() {
        this.timer = new Tiempo();
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
    }

    getMapArray(config?: { lastState: boolean, filter: string[], time: "MILISEGUNDOS" | "SEGUNDOS" | "MINUTOS", lastTime: boolean }) {
        const { lastIndex, estados } = this.toJSON()
        return EstadoManager.getArrayMap(lastIndex, estados, config)
    }

    static getArrayMap(lastIndex: number, estados: { key: string, values: IEstado[] }[], config?: { lastState: boolean, filter: string[], time: "MILISEGUNDOS" | "SEGUNDOS" | "MINUTOS", lastTime: boolean }) {

        var titulares: string[] = [];
        var values: (string | number | boolean)[][] = [];
        var index = 0;

        var mapEstados = new Map<string, IMedicion>();

        estados.forEach(({ values, key }, index) => {

            var findStateFilter = false;
            if (config !== undefined) {
                config.filter.forEach((filtro) => {
                    if (filtro === key) {
                        findStateFilter = true;
                    }
                })
            } else {
                findStateFilter = true;
            }

            if (findStateFilter) {
                titulares.push(key);
                mapEstados.set(key, {
                    index: 0,
                    estados: values
                });
            }

        });

        var buscando = true;

        var currentObjectState: undefined | IEstado;
        var nextObjectState: undefined | IEstado;

        while (buscando) {

            var isFindObjectState = index < lastIndex;

            while (isFindObjectState) {

                titulares.forEach((titular) => {
                    var estadoArray = mapEstados.get(titular) as IMedicion;
                    var lastState = estadoArray.estados[estadoArray.index];

                    if (currentObjectState === undefined && lastState.index === index) {
                        currentObjectState = lastState;
                    }

                    if (currentObjectState !== undefined && nextObjectState === undefined) {
                        var nFindNextState = false;

                        const nIndex = index + 1
                        if (lastState.index === nIndex && currentObjectState.index !== lastState.index) {
                            nextObjectState = lastState;
                            nFindNextState = true;
                        }

                        if (nFindNextState === false) {
                            const nextIndex = estadoArray.index + 1;
                            if (nextIndex < estadoArray.estados.length) {
                                var nextState = estadoArray.estados[nextIndex];
                                if (nextState.index === nIndex && currentObjectState.index !== nextState.index) {
                                    nextObjectState = nextState;
                                }
                            }
                        }
                    }


                })

                if ((currentObjectState === undefined || nextObjectState === undefined) && index + 1 < lastIndex) {
                    index++;
                } else if (currentObjectState !== undefined && nextObjectState !== undefined) {
                    isFindObjectState = false
                } else {
                    isFindObjectState = false;
                }

            }

            let valoresCount = [] as (string | number | boolean)[]
            titulares.forEach((titular) => {

                let estadoArray = mapEstados.get(titular) as IMedicion;
                let lastState = estadoArray.estados[estadoArray.index];
                const nextIndex = estadoArray.index + 1;

                if (lastState.index <= index) {
                    valoresCount.push(lastState.value)
                } else {
                    valoresCount.push("")
                }

                if (nextObjectState && nextIndex < estadoArray.estados.length) {
                    var nextState = estadoArray.estados[nextIndex];

                    if (nextState.time <= nextObjectState.time && nextState.index <= nextObjectState.index) {
                        estadoArray.index++
                    }

                }


            });

            const isChangeTime =
                (currentObjectState !== undefined && nextObjectState !== undefined
                    && currentObjectState.time !== nextObjectState.time) || nextObjectState === undefined
                    ? "VERDADERO" : "";

            var lastTimeObject = currentObjectState ? currentObjectState.time : -1

            currentObjectState = nextObjectState;
            if (currentObjectState) {
                index = currentObjectState.index;
            }
            nextObjectState = undefined;

            if (currentObjectState === undefined && nextObjectState === undefined) {
                buscando = false;
            }

            const isLastState = buscando === true ? "" : "VERDADERO";

            var almacenar = false;

            if (config !== undefined) {

                if (config.time === "MILISEGUNDOS") {

                } else if (config.time === "SEGUNDOS") {
                    lastTimeObject = lastTimeObject / 1000;
                } else if (config.time === "MINUTOS") {
                    lastTimeObject = lastTimeObject / 6000;
                }

                if (config.lastState === true) {

                    if (config.lastTime === true) {

                        if (isChangeTime === "VERDADERO" && isLastState === "VERDADERO") {

                            almacenar = true;

                        }

                    } else {
                        if (isLastState === "VERDADERO") {
                            almacenar = true;
                        }
                    }
                } else {
                    almacenar = true;
                }
            } else {
                almacenar = true;
            }


            if (almacenar) {
                values.push([isLastState, isChangeTime, lastTimeObject, ...valoresCount]);
            }

        }

        titulares = ["LAST STATE", "LAST TIME", "TIEMPO P.", ...titulares] as string[];

        return { titulares, values }
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