import InteractionStructure from "../types/InteractionStructure";

import CARRERAS from '../types/Carreras';
import MadLabActivity from '../../../interactions/2022-1/MadLab/MadLab';
import DiagnosticalosActivity from '../../../interactions/2022-1/Diagnosticalos/Actividad';
import CouncelingActivity from '../../../interactions/2022-1/CouncelingTesting/Actividad';


const Interacciones20221: InteractionStructure[] = [];

const SumaFlowInteraccion: InteractionStructure = {
    UID: "5b2c869c-76d9-41f6-87d6-a2e65cb1fad7",
    date: "01-04-2022",
    type: "EXTERNA",
    title: "Suma Flow",
    image: "/includes/preview/version6/sumaflow_Preview.png",
    actividad: "/proyectos/2022-1/SumaFlow/index.html",
    tags: [CARRERAS.INGENIERIA_SISTEMAS],
    defaultMaximos: [{ id: CARRERAS.INGENIERIA_SISTEMAS, value: 200 }]
}

Interacciones20221.push(SumaFlowInteraccion)



const MadLabInteraction: InteractionStructure = {
    UID: "f0e9bf55-c353-4889-b252-e382f23fba22",
    date: "01-04-2022",
    type: "INTERNA",
    title: "Mad Lab",
    image: "/includes/preview/version6/madlab.jpg",
    actividad: () => <MadLabActivity />,
    tags: [CARRERAS.QUIMICA],
    defaultMaximos: [{ id: CARRERAS.QUIMICA, value: 200 }]
}

Interacciones20221.push(MadLabInteraction);


const CouncelingInteraction: InteractionStructure = {
    UID: "559acfb6-5d3b-47d5-9da7-4143f5c52979",
    date: "01-04-2022",
    type: "INTERNA",
    title: "Counceling Testing",
    image: "/includes/preview/version6/councelingTesting.png",
    actividad: () => <CouncelingActivity />,
    tags: [CARRERAS.LICENCIATURA_IDIOMAS],
    defaultMaximos: [{ id: CARRERAS.LICENCIATURA_IDIOMAS, value: 200 }]
}

Interacciones20221.push(CouncelingInteraction);

const Diagnosticalos: InteractionStructure = {
    UID: "3a542acc-4254-431b-b2b5-256ade97cadb",
    date: "01-04-2022",
    type: "INTERNA",
    title: "Diagnosticalos",
    image: "/includes/preview/version6/diagnosticalos_preview.png",
    actividad: () => <DiagnosticalosActivity />,
    tags: [CARRERAS.MEDICINA],
    defaultMaximos: [{ id: CARRERAS.MEDICINA, value: 200 }]
}

Interacciones20221.push(Diagnosticalos);



export default Interacciones20221;