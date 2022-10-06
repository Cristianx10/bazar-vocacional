import { ResultadoInteraction, ResultadoPuntuacion } from '../../resultados/types';
type TRoles = "LOCAL" | "ADMINISTRADOR" | "EDITOR" | "VISOR" | "";

interface IUserInformation {
    id: string;
    value: string | number;
}

export interface IUsuario {
    UID: string;
    nombre: string;
    correo: string;
    role: TRoles;
    identificacion: string;
    genero: string;
    prueba: string;
    date: {
        inicial: number
    }
    preferencias: string[];
    informacion: IUserInformation[];
    resultados: {
        fecha: number,
        result: {
            global: ResultadoPuntuacion[];
            maximo: ResultadoPuntuacion[];
            porcentaje: ResultadoPuntuacion[];
        }
    }
}

class Usuario implements IUsuario {

    UID: string;
    nombre: string;
    identificacion: string;
    genero: string;
    prueba: string;
    correo: string;
    role: TRoles;
    date: { inicial: number; }
    preferencias: string[];

    //Pendiente de metodo para obtener
    informacion: IUserInformation[];
    interacciones: ResultadoInteraction[];
    resultados: {
        fecha: number,
        result: {
            global: ResultadoPuntuacion[];
            maximo: ResultadoPuntuacion[];
            porcentaje: ResultadoPuntuacion[];
        }
    }

    constructor(user: IUsuario) {
        this.UID = user.UID;
        this.nombre = user.nombre;
        this.correo = user.correo;
        this.role = user.role;
        this.date = user.date;
        this.preferencias = user.preferencias;
        this.resultados = user.resultados;
        this.informacion = user.informacion;
        this.identificacion = user.identificacion;
        this.genero = user.genero;
        this.prueba = user.prueba;
        this.interacciones = [];
    }


    getAllInteracciones() {
        //Codigo pendiente
    }


}

export default Usuario;