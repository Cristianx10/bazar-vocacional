import { IMedicionUnity } from '../estados/EstadoManager';


export interface ResultadoPuntuacion {
    id: string;
    value: number;
}

export type TStateProceso = "NO INICIADA" | "INICIADA" | "FINALIZADA";

export interface ResultadoInteractionSimple {
    UID: string;
    UIDUser: string;
    UIDActivity: string;
    fecha: {
        inicio: number;
        fin: number;
    };
    estado: TStateProceso;
    resultados: ResultadoPuntuacion[];
    maximos: ResultadoPuntuacion[];
    porcentajes: ResultadoPuntuacion[];
}


export interface ResultadoInteraction extends ResultadoInteractionSimple{
    data: IMedicionUnity;
    informacion: ResultadoUser[];
}


export interface ResultadoUser { id: string, value: string | number }