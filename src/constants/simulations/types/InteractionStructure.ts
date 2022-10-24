import { ResultadoPuntuacion } from "../../resultados/types";

interface InteractionStructure {
    UID: string;
    UIDUnity?: string;
    visibility?: boolean
    type: "EXTERNA" | "INTERNA";
    title: string;
    image: string;
    actividad: (() => JSX.Element) | string;
    tags: string[];
    defaultMaximos: ResultadoPuntuacion[],
    date: string;
    beforeActivitys?: InteractionStructureChild[];
    afterActivitys?: InteractionStructureChild[];
    config?: Object;
    repeat?: boolean;
    uniqueUID?: string;
}

export interface InteractionStructureChild{
    UID: string, refUID: string, config: Object, repeat: boolean
}

export default InteractionStructure;


