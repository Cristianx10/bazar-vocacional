type TRoles = "LOCAL" | "ADMINISTRADOR" | "EDITOR" | "VISOR" | "";

class Usuario {
    UID: string;
    nombre: string;
    correo: string;
    role: TRoles;

    constructor(UID: string, nombre: string, correo: string, role: TRoles) {
        this.UID = UID;
        this.nombre = nombre;
        this.correo = correo;
        this.role = role;
    }
}

export default Usuario;