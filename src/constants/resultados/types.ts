import { IMedicionUnity } from '../estados/EstadoManager';


export interface ResultadoPuntuacion {
    id: string;
    value: number;
}

type TState = "INICIADA" | "EN PROCESO" | "FINALIZADA";

export interface ResultadoInteraction {
    UID: string;
    UIDUser: string;
    UIDActivity: string;
    fecha: {
        inicio: number;
        fin: number;
    };
    estado: TState;
    resultados: ResultadoPuntuacion[];
    maximos: ResultadoPuntuacion[];
    data: IMedicionUnity;
    informacion: ResultadoUser[];
}


export interface ResultadoUser { id: string, value: string | number }