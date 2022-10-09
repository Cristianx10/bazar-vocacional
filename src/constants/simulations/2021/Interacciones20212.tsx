import InteractionStructure from "../types/InteractionStructure";

import CARRERAS from '../types/Carreras';


const Interacciones20211: InteractionStructure[] = [];

const pokemon: InteractionStructure = {
    type:"EXTERNA",
    UID: "daff74e2-6e24-4b21-ace3-46b6bb268249",
    title: "Dmi",
    image: "/includes/preview/version5/dmi.png",
    actividad: "/proyectos/2021-2/Pokemon/index.html",
    tags: [CARRERAS.DISENO_MEDIOS_INTERACTIVOS],
    defaultMaximos: [{ id: CARRERAS.DISENO_MEDIOS_INTERACTIVOS, value: 200 }]
}
Interacciones20211.push(pokemon)




export default Interacciones20211;