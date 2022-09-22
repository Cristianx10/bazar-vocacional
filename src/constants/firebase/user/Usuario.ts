import { ResultadoInteraction } from '../../resultados/types';
type TRoles = "LOCAL" | "ADMINISTRADOR" | "EDITOR" | "VISOR" | "";

export interface IUsuario {
    UID: string;
    nombre: string;
    correo: string;
    role: TRoles;
    date: {
        inicial: number
    }
    preferencias: string[];
}

class Usuario implements IUsuario {

    UID: string;
    nombre: string;
    correo: string;
    role: TRoles;
    date: { inicial: number; }
    preferencias: string[];
    interacciones: ResultadoInteraction[];

    constructor(user: IUsuario) {
        this.UID = user.UID;
        this.nombre = user.nombre;
        this.correo = user.correo;
        this.role = user.role;
        this.date = user.date;
        this.preferencias = user.preferencias;
        this.interacciones = [];
    }

    getAllInteracciones(){
        //Codigo pendiente
    }
   

}

export default Usuario;