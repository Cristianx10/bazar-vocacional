import InteractionStructure from "../types/InteractionStructure";

import CARRERAS from '../types/Carreras';
import Botanica from '../../../interactions/2020-2/Botanica/index';



const Interacciones20202: InteractionStructure[] = [];


const InteraccionBiologia: InteractionStructure = {
    UID: "6c8f75da2cd0474a92b4c02f05b512d5",
    type:"INTERNA",
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

export default Interacciones20202;