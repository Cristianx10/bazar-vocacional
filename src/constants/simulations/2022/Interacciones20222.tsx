import InteractionStructure from "../types/InteractionStructure";

import CARRERAS from '../types/Carreras';
import { preguntasAdministracion, preguntasMedicina, preguntasMercadeo, preguntasPsicologia, preguntasQuimica, preguntasSistemas } from "./preguntas";


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
    beforeActivitys: preguntasMercadeo,
    afterActivitys: [
        { UID: "176fb003-aac2-49a7-a5e6-d216d2e6d11f", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "A3" }, repeat: true }
    ]
}

const Psicologia16PersonalidadesInteraction: InteractionStructure = {
    UID: "1e3b145a-1b44-4553-b1f0-bd3640d99aaf",
    date: "24-10-2022",
    type: "EXTERNA",
    title: "16 personalidades",
    image: "/includes/preview/version7/psicologiaPreview.png",
    actividad: "/proyectos/2022-2/psicologia/index.html",
    tags: [CARRERAS.PSICOLOGIA],
    defaultMaximos: [{ id: CARRERAS.PSICOLOGIA, value: 200 }],
    beforeActivitys: preguntasPsicologia,
    afterActivitys: [
        { UID: "176fb003-aac2-49a7-a5e6-d216d2e6d11f", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "A2" }, repeat: true }
    ]
}

const Quimica20222Interaction: InteractionStructure = {
    UID: "4cdf8fee-d375-4ccf-bfe0-303fe1296155",
    date: "24-10-2022",
    type: "EXTERNA",
    title: "2020's Lab",
    image: "/includes/preview/version7/quimicaPreview.png",
    actividad: "/proyectos/2022-2/quimica/index.html",
    tags: [CARRERAS.QUIMICA],
    defaultMaximos: [{ id: CARRERAS.QUIMICA, value: 200 }],
    beforeActivitys: preguntasQuimica,
    afterActivitys: [
        { UID: "176fb003-aac2-49a7-a5e6-d216d2e6d11f", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "A6" }, repeat: true }
    ]
}

const MedicinaMobileInteraction: InteractionStructure = {
    UID: "10758a03-dd0d-4029-b39d-5299c81e0379",
    date: "24-10-2022",
    type: "EXTERNA",
    title: "Medicina Mobile",
    image: "/includes/preview/version7/medicinaPreview.png",
    actividad: "/proyectos/2022-2/medicina/index.html",
    tags: [CARRERAS.MEDICINA],
    defaultMaximos: [{ id: CARRERAS.MEDICINA, value: 200 }],
    beforeActivitys: preguntasMedicina,
    afterActivitys: [
        { UID: "176fb003-aac2-49a7-a5e6-d216d2e6d11f", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "A4" }, repeat: true }
    ]
}

const AdministracionInteraction: InteractionStructure = {
    UID: "f389aa20-6a49-47fc-bb2a-232cb2415ab0",
    date: "24-10-2022",
    type: "EXTERNA",
    title: "Space Invaders Admin",
    image: "/includes/preview/version7/adminPreview.png",
    actividad: "/proyectos/2022-2/administracion/index.html",
    tags: [CARRERAS.ADMINISTRACION_EMPRESA],
    defaultMaximos: [{ id: CARRERAS.ADMINISTRACION_EMPRESA, value: 200 }],
    beforeActivitys: preguntasAdministracion,
    afterActivitys: [
        { UID: "176fb003-aac2-49a7-a5e6-d216d2e6d11f", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "A5" }, repeat: true }
    ]
}

const SistemasInteraction: InteractionStructure = {
    UID: "ecb5ad5f-c87b-401c-bae3-4dc2ee6819aa",
    date: "24-10-2022",
    type: "EXTERNA",
    title: "the alien's journey",
    image: "/includes/preview/version7/sistemasPreview.png",
    actividad: "/proyectos/2022-2/sistemas/index.html",
    tags: [CARRERAS.INGENIERIA_SISTEMAS],
    defaultMaximos: [{ id: CARRERAS.INGENIERIA_SISTEMAS, value: 200 }],
    beforeActivitys: preguntasSistemas,
    afterActivitys: [
        { UID: "176fb003-aac2-49a7-a5e6-d216d2e6d11f", refUID: "7a082f19-7699-406c-bacd-e2825f32ae57", config: { id: "A1" }, repeat: true }
    ]
}
Interacciones20222.push(MercadeoMarketInteraction)

Interacciones20222.push(Psicologia16PersonalidadesInteraction)
Interacciones20222.push(Quimica20222Interaction)
Interacciones20222.push(MedicinaMobileInteraction)
Interacciones20222.push(AdministracionInteraction)
Interacciones20222.push(SistemasInteraction)

export default Interacciones20222;