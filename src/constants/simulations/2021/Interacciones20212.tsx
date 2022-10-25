import InteractionStructure from "../types/InteractionStructure";

import CARRERAS from '../types/Carreras';
import Licenciatura from '../../../interactions/2021-2/Lic/Actividad';


const Interacciones20212: InteractionStructure[] = [];

const pokemon: InteractionStructure = {
    type: "EXTERNA",
    date: "01-10-2021",
    UID: "daff74e2-6e24-4b21-ace3-46b6bb268249",
    title: "Dmi",
    image: "/includes/preview/version5/dmi.png",
    actividad: "/proyectos/2021-2/Pokemon/index.html",
    tags: [CARRERAS.DISENO_MEDIOS_INTERACTIVOS],
    defaultMaximos: [{ id: CARRERAS.DISENO_MEDIOS_INTERACTIVOS, value: 200 }]
}
Interacciones20212.push(pokemon)


const Lic: InteractionStructure = {
    type: "INTERNA",
    date: "01-10-2021",
    UID: "2b14e403-0377-4a6f-a468-813f9a2e9af3",
    title: "Licenciatura",
    image: "/includes/preview/version5/lic.png",
    actividad: () => <Licenciatura />,
    tags: [CARRERAS.LICENCIATURA],
    defaultMaximos: [{ id: CARRERAS.LICENCIATURA, value: 200 }]
}

Interacciones20212.push(Lic);




export default Interacciones20212;