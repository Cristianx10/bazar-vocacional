import InteractionStructure from "../types/InteractionStructure";

import CARRERAS from '../types/Carreras';

import MezclandoQuimica from '../../../interactions/2020-1/MezclandoQuimica/MezclandoConRick';
/*
import Operando from '../../../interactions/2020-1/Operando/Operando';
import Economia from '../../../interactions/2020-1/Economia/Economia';
import Petroleo from '../../../interactions/2020-1/Petroleo/Petroleo';
import Revoltosos from '../../../interactions/2020-1/Revoltosos/Revoltosos';
import Gusanito from '../../../interactions/2020-1/Gusanito/Gusanito';
import Culpable from '../../../interactions/2020-1/Culpable/Culpable';
import Hablame from '../../../interactions/2020-1/Hablame/Hablame';
import Narrativa from '../../../interactions/2020-1/Narrativa/Narrativa';
*/

const Interacciones20201: InteractionStructure[] = [];



const InteraccionMezclandoQuimica: InteractionStructure = {
    UID: "12a8901921554c1bb8fd6cfdb8f90ba3",
    date:"01-04-2020",
    type:"INTERNA",
    title: "Quimica",
    image: "/includes/preview/lab-quimica.png",
    actividad: () => <MezclandoQuimica />,
    tags: [CARRERAS.CIENCIAS_NATURALES],
    defaultMaximos: [
        { id: CARRERAS.CIENCIAS_NATURALES, value: 200 }
    ]
}

Interacciones20201.push(InteraccionMezclandoQuimica);




export default Interacciones20201;