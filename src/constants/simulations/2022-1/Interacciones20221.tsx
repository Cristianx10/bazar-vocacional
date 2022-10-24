import InteractionStructure from "../types/InteractionStructure";

import CARRERAS from '../types/Carreras';
import MadLabActivity from '../../../interactions/2022-1/MadLab/MadLab';


const Interacciones20221: InteractionStructure[] = [];

const SumaFlowInteraccion: InteractionStructure = {
    UID: "5b2c869c-76d9-41f6-87d6-a2e65cb1fad7",
    date: "01-04-2022",
    type: "EXTERNA",
    title: "Suma Flow",
    image: "/includes/preview/version6/sumaflow_Preview.png",
    actividad: "/proyectos/2022-1/SumaFlow/index.html",
    tags: [CARRERAS.INGENIERIA_SISTEMAS],
    defaultMaximos: [{ id: CARRERAS.INGENIERIA_SISTEMAS, value: 200 }],
    beforeActivitys: [
        { UID: "8c5fe9ff-6b26-4b68-9a3f-c3eb596fc65c", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "B1" }, repeat: false },
      /*  { UID: "2a16b6bf-473f-4694-b11e-bd3dee799308", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "B2" }, repeat: false },
        { UID: "ff1fc205-2b8c-48cb-9938-727ae7e6841b", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "B3" }, repeat: false },
        { UID: "3ed39d25-5181-4860-a293-a980797264a9", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "B4" }, repeat: false },
        { UID: "9e9ae56d-ef33-4c77-946f-066327544aee", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "B5" }, repeat: false }
        */
    ],
    afterActivitys: [
        { UID: "9e9ae56d-ef33-4c77-946f-066327544aee", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "B5" }, repeat: true }
    ]
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



export default Interacciones20221;