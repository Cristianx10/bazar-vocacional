
import InteractionStructure from "./types/InteractionStructure";

import Interacciones20221 from "./2022-1/Interacciones20221";
import Interacciones20211 from './2021/Interacciones20212';



const ListGeneral: Map<string, InteractionStructure> = new Map();



export var Categorias = new Map<number, string>();
var index = 0;

[
    {
        title: "Interacciones 2021-1",
        values: Interacciones20211
    }
    ,
    {
        title: "Interacciones 2022-1",
        values: Interacciones20221
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