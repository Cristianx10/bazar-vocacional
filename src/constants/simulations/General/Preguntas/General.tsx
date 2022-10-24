import InteractionStructure from "../../types/InteractionStructure";
import Pregunta from '../../../../interactions/ui/Pregunta/index';


const GeneralActividades: InteractionStructure[] = [];


const InteraccionPregunta1: InteractionStructure = {
    type:"INTERNA",
    visibility:false,
    date: "01-04-2020",
    UID: "7a082f19-7699-406c-bacd-e2825f32ae57",
    title: "Pregunta Excel",
    image: "/includes/preview/pregunta-1-preview.png",
    actividad: () => <Pregunta />,
    tags: [],
    defaultMaximos: []
}

GeneralActividades.push(InteraccionPregunta1);


export default GeneralActividades;