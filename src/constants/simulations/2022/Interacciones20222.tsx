import InteractionStructure from "../types/InteractionStructure";

import CARRERAS from '../types/Carreras';


const Interacciones20222: InteractionStructure[] = [];

const MercadeoMarketInteraction: InteractionStructure = {
    UID: "b4c30f28-e9e9-432b-bcd3-2118ed53f88c",
    date: "24-10-2022",
    type: "EXTERNA",
    title: "Mercadeo Market",
    image: "/includes/preview/version7/mercadeo20222preview.png",
    actividad: "/proyectos/2022-2/mercadeo/index.html",
    tags: [CARRERAS.MERCADEO],
    defaultMaximos: [{ id: CARRERAS.MERCADEO, value: 200 }],
    beforeActivitys: [
        { UID: "8c5fe9ff-6b26-4b68-9a3f-c3eb596fc65c", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "B1" }, repeat: false },
        { UID: "ff1fc205-2b8c-48cb-9938-727ae7e6841b", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "B3" }, repeat: false },
        /*  { UID: "2a16b6bf-473f-4694-b11e-bd3dee799308", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "B2" }, repeat: false },
        { UID: "3ed39d25-5181-4860-a293-a980797264a9", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "B4" }, repeat: false },
        { UID: "758377e6-8e49-4b9f-b8d3-1632a2aa2827", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "B5" }, repeat: false }
        */
    ],
    afterActivitys: [
        { UID: "9e9ae56d-ef33-4c77-946f-066327544aee", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "B5" }, repeat: true }
    ]
}

Interacciones20222.push(MercadeoMarketInteraction)

export default Interacciones20222;