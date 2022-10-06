import { IEstado, IMedicionUnity } from './EstadoManager';

interface IMedicion {
    index: number,
    estados: IEstado[]
}

interface IMedicionFilter {
    lastState: boolean, filter: string[], time: "MILISEGUNDOS" | "SEGUNDOS" | "MINUTOS", lastTime: boolean
}

class EstadosManagerAnalitics {
    static getArrayMap(info: IMedicionUnity, config?: IMedicionFilter) {

        console.log("MY INFO:", info)

        const { estados, lastIndex } = info;

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

            var isFindObjectState = index < lastIndex || (lastIndex === 0 && index === 0);



            while (isFindObjectState) {

                titulares.forEach((titular) => {
                    var estadoArray = mapEstados.get(titular) as IMedicion;
                    var lastState = estadoArray.estados[estadoArray.index];

                    console.log("1: ", lastState.index, index)

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

                    console.log("2: ", currentObjectState)

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

            console.log("3: ", currentObjectState)


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

        titulares = ["LAST STATE", "LAST TIME", "TIEMPO P. " + `(${config ? config.time : "MILISEGUNDOS"})`, ...titulares] as string[];


        console.log("MY INFO:", titulares, values)

        return { titulares, values }
    }

}

export default EstadosManagerAnalitics;