import { IMedicionUnity } from '../estados/EstadoManager';


export interface ResultadoPuntuacion {
    id: string;
    value: number;
}

type TState = "INICIADA" | "EN PROCESO" | "FINALIZADA";

export interface ResultadoInteraction {
    UID: string;
    fecha: {
        inicio: number;
        fin: number;
    };
    estado: TState;
    UIDActivity: string;
    resultados: ResultadoPuntuacion[];
    maximos: ResultadoPuntuacion[];
    data: IMedicionUnity;
}


export interface ResultadoUser { id: string, value: string | number }