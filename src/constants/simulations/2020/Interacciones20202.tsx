import InteractionStructure from "../types/InteractionStructure";

import CARRERAS from '../types/Carreras';
import Botanica from '../../../interactions/2020-2/Botanica/index';
import Comunicacion from '../../../interactions/2020-2/Comunicacion/Comunicacion';
import Loros from '../../../interactions/2020-2/ContaduriaPublica/Loros';
import Derecho from '../../../interactions/2020-2/Derecho/Derecho';
import Mercadeo from '../../../interactions/2020-2/Mercadeo/Mercadeo';
import Expresiones from '../../../interactions/2020-2/Psicologia/Expresiones';



const Interacciones20202: InteractionStructure[] = [];


const InteraccionBiologia: InteractionStructure = {
    UID: "6c8f75da2cd0474a92b4c02f05b512d5",
    type: "INTERNA",
    date: "01-10-2020",
    title: "Botánica",
    image: "/includes/preview/version3/botanica-preview.png",
    actividad: () => <Botanica />,
    tags: [CARRERAS.CIENCIAS_NATURALES],
    defaultMaximos: [
        { id: CARRERAS.CIENCIAS_NATURALES, value: 200 }
    ]
}

Interacciones20202.push(InteraccionBiologia);

const InteraccionComunicacion: InteractionStructure = {
    UID: "06bbd0e5fafd4d8e9fe441c737117430",
    type: "INTERNA",
    date: "01-10-2020",
    title: "Comunicacion",
    image: "/includes/preview/version3/comunicacion-preview.png",
    actividad: () => <Comunicacion />,
    tags: [CARRERAS.COMUNICACION],
    defaultMaximos: [
        { id: CARRERAS.COMUNICACION, value: 200 }
    ]
}

Interacciones20202.push(InteraccionComunicacion);


//PENDIENTE POR REVISAR
const InteraccionLoros: InteractionStructure = {
    UID: "2d126f82b86548d181deda01ea886c70",
    type: "INTERNA",
    date: "01-10-2020",
    title: "Loros",
    image: "/includes/preview/version3/loros-preview.png",
    actividad: () => <Loros />,
    tags: [CARRERAS.CONTADURIA],
    defaultMaximos: [
        { id: CARRERAS.CONTADURIA, value: 200 }
    ]
}

//Interacciones20202.push(InteraccionLoros);

const InteraccionDerecho: InteractionStructure = {
    UID: "a2afcbc33baf4e89a68baa148c6c5840",
    type: "INTERNA",
    date: "01-10-2020",
    title: "Derecho",
    image: "/includes/preview/version3/derecho-preview.png",
    actividad: () => <Derecho />,
    tags: [CARRERAS.DERECHO],
    defaultMaximos: [
        { id: CARRERAS.DERECHO, value: 200 }
    ]
}

Interacciones20202.push(InteraccionDerecho);

const InteraccionMercadeo: InteractionStructure = {
    UID: "fad850d1fa4d41b39d3b9dd264f5250a",
    type: "INTERNA",
    date: "01-10-2020",
    title: "Mercadeo",
    image: "/includes/preview/version3/mercadeo-preview.png",
    actividad: () => <Mercadeo />,
    tags: [CARRERAS.MERCADEO],
    defaultMaximos: [
        { id: CARRERAS.MERCADEO, value: 200 }
    ]
}

Interacciones20202.push(InteraccionMercadeo);

const InteraccionExpresiones: InteractionStructure = {
    UID: "43e9d997e4fa4ddebfe3c7652d25e657",
    type: "INTERNA",
    date: "01-10-2020",
    title: "Expresiones",
    image: "/includes/preview/version3/expresiones-preview.png",
    actividad: () => <Expresiones />,
    tags: [CARRERAS.PSICOLOGIA],
    defaultMaximos: [
        { id: CARRERAS.PSICOLOGIA, value: 200 }
    ]
}

Interacciones20202.push(InteraccionExpresiones);



export default Interacciones20202;