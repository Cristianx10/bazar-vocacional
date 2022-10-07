import InteractionStructure from "../types/InteractionStructure";

import CARRERAS from '../types/Carreras';
import MadLabActivity from '../../../interactions/2022-1/MadLab/MadLab';


const Interacciones20221: InteractionStructure[] = [];

const SumaFlowInteraccion: InteractionStructure = {
    UID: "5b2c869c-76d9-41f6-87d6-a2e65cb1fad7",
    type: "EXTERNA",
    title: "Suma Flow",
    image: "/includes/preview/version6/sumaflow_Preview.png",
    actividad: "/proyectos/2022-1/SumaFlow/index.html",
    tags: [CARRERAS.INGENIERIA_SISTEMAS],
    defaultMaximos: [{ id: CARRERAS.INGENIERIA_SISTEMAS, value: 200 }]
}

Interacciones20221.push(SumaFlowInteraccion)



const GatoPrueba: InteractionStructure = {
    UID: "37528af0-9c13-4d66-b9df-880b0b5d4f66",
    type: "EXTERNA",
    title: "PRUEBA 1",
    image: "/includes/preview/version6/sumaflow_Preview.png",
    actividad: "/proyectos/prueba1/index.html",
    tags: [CARRERAS.INGENIERIA_SISTEMAS],
    defaultMaximos: [{ id: CARRERAS.INGENIERIA_SISTEMAS, value: 200 }]
}

Interacciones20221.push(GatoPrueba)



const MadLabInteraction: InteractionStructure = {
    UID: "f0e9bf55-c353-4889-b252-e382f23fba22",
    type: "INTERNA",
    title: "Mad Lab",
    image: "/includes/preview/version6/madlab.jpg",
    actividad: () => <MadLabActivity />,
    tags: [CARRERAS.QUIMICA],
    defaultMaximos: [{ id: CARRERAS.QUIMICA, value: 200 }]
}

Interacciones20221.push(MadLabInteraction);



export default Interacciones20221;