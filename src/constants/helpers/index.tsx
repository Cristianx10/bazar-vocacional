import { ResultadoPuntuacion } from '../resultados/types';
export const JoinStyles = (nameSytles: string[], divide = " ") => {
    let className = "";

    nameSytles.forEach((s, i) => {
        let space = divide;
        if (i === 0) {
            space = "";
        }
        if (s !== "" && s !== undefined && s !== null) {
            className = className + space + s;
        }
    });

    return className
}

export const Descargar = (name: string, data: string | ArrayBuffer, type = 'text/plain') => {
    var nombre = name;
    var text = data;
    var blob = new Blob([text], { type });
    var anchor = document.createElement('a');

    anchor.download = nombre;
    anchor.href = (/*window.webkitURL ||*/ window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = [type, anchor.download, anchor.href].join(':');
    anchor.click();
}

export const calculatePorcentaje = (resultadosData: ResultadoPuntuacion[], maximosData: ResultadoPuntuacion[]) => {

    var resultados = new Map<string, number>();
    var maximos = new Map<string, number>();
    var porcentajes = new Map<string, number>();

    resultadosData.forEach(({ id, value }) => {
        resultados.set(id, value);
    })

    maximosData.forEach(({ id, value }) => {
        maximos.set(id, value);
    })

    resultados.forEach((value, key) => {
        const resultado = resultados.get(key);
        const maximo = maximos.get(key);

        if (resultado !== undefined && maximo !== undefined) {
            porcentajes.set(key, resultado / maximo)
        }
    })

    var porcentajesData: ResultadoPuntuacion[] = [];
    porcentajes.forEach((value, key) => {
        porcentajesData.push({ id: key, value })
    })

    return porcentajesData;
}