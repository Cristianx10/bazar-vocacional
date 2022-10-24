import InteractionStructure from "../types/InteractionStructure";

import CARRERAS from '../types/Carreras';


const Interacciones20212: InteractionStructure[] = [];

const pokemon: InteractionStructure = {
    type:"EXTERNA",
    date: "01-10-2021",
    UID: "daff74e2-6e24-4b21-ace3-46b6bb268249",
    title: "Dmi",
    image: "/includes/preview/version5/dmi.png",
    actividad: "/proyectos/2021-2/Pokemon/index.html",
    tags: [CARRERAS.DISENO_MEDIOS_INTERACTIVOS],
    defaultMaximos: [{ id: CARRERAS.DISENO_MEDIOS_INTERACTIVOS, value: 200 }]
}
Interacciones20212.push(pokemon)




export default Interacciones20212;