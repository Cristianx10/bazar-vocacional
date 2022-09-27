import { ResultadoPuntuacion } from "../../resultados/types";

interface InteractionStructure {
    UID: string;
    UIDUnity?: string;
    type: "EXTERNA" | "INTERNA";
    title: string;
    image: string;
    actividad: (() => JSX.Element) | string;
    tags: string[];
    defaultMaximos: ResultadoPuntuacion[]
}

export default InteractionStructure;


