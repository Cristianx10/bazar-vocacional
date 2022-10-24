
import InteractionStructure from "./types/InteractionStructure";

import Interacciones20221 from "./2022-1/Interacciones20221";
import GeneralActividades from './General/Preguntas/General';
import Interacciones20222 from './2022-2/Interacciones20222';
import Interacciones20212 from './2021/Interacciones20212';



const ListGeneral: Map<string, InteractionStructure> = new Map();



export var Categorias = new Map<number, string>();
var index = 0;

[
    {
        title: "General",
        values: GeneralActividades
    },

    {
        title: "Interacciones 2021-2",
        values: Interacciones20212
    }
    ,
    {
        title: "Interacciones 2022-1",
        values: Interacciones20221
    }
    , {
        title: "Interacciones 2022-2",
        values: Interacciones20222
    }

].forEach(({ title, values }, i) => {

    values.forEach((actividad, j) => {
        if (j === 0) {
            Categorias.set(index, title)
        }
        ListGeneral.set(actividad.UID, actividad)
        index++;
    })
});



export default ListGeneral;