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
    DISENO_MEDIOS_INTERACTIVOS: "DISENO_MEDIOS_INTERACTIVOS",
}

export const CARRERAS_NAME = {
    INGENIERIA: "INGENIERÍA",
    DISENO: "DISEÑO",
    CIENCIAS_NATURALES: "CIENCIAS NATURALES",
    COMUNICACION: "COMUNICACIÓN",
    PSICOLOGIA: "PSICOLOGÍA",
    DERECHO: "DERECHO",
    CONTADURIA: "CONTADURÍA",
    MUSICA: "MÚSICA",
    MERCADEO: "MERCADEO",
    LICENCIATURA: "LICENCIATURA",
    LICENCIATURA_IDIOMAS: "LICENCIATURA IDIOMAS",
    HUMANIDADES: "HUMANIDADES",
    ECONOCMIA: "ECONOMÍA",
    MEDICINA: "MEDICINA",
    BIOLOGIA: "BIOLOGÍA",
    INGENIERIA_SISTEMAS: "INGENIERÍA SISTEMAS",
    DISENO_INDUSTRIAL: "DISEÑO INDUSTRIAL",
    QUIMICA: "QUÍMICA",
    DISENO_MODAS: "DISEÑO MODAS",
    DISENO_MEDIOS_INTERACTIVOS: "DISEÑO DE MEDIOS INTERACTIVOS",
}

export const getNamesCarrerasMap = () => {
    const NAMES_CARRERAS_MAP = new Map();

    Object.entries(CARRERAS_NAME).forEach(
        ([key, value]) => {
            NAMES_CARRERAS_MAP.set(key, value)
        }
    )

    //  console.log(NAMES_CARRERAS_MAP)
    return NAMES_CARRERAS_MAP;
}

const formatCarrera = getNamesCarrerasMap();

export const formatCarreraString = (name: string) => {
    var carrera: string = formatCarrera.get(name);
    var result = "";
    if (carrera) {
        var cadena = carrera.toLowerCase().split(' ');
        for (var i = 0; i < cadena.length; i++) {
            cadena[i] = cadena[i].charAt(0).toUpperCase() + cadena[i].substring(1) + " ";
        }
        cadena.forEach(c => {
            result = result + c;
        })
    }




    return result;
}


export default CARRERAS;