import { ResultadoInteraction, ResultadoPuntuacion, ResultadoInteractionSimple } from '../../resultados/types';
import DBRoutes from '../database/DBRoutes';
import Database from '../database/index';
import { calculatePorcentaje } from '../../helpers/index';
import Registro from '../../resultados/Registro';
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
    resultados: IDataResult;
}

interface IDataResult {
    fecha: { inicio: number, fin: number },
    result: {
        global: ResultadoPuntuacion[];
        maximo: ResultadoPuntuacion[];
        porcentaje: ResultadoPuntuacion[];
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
    resultados: IDataResult;

    constructor(user: IUsuario) {
        this.UID = user.UID;
        this.nombre = user.nombre;
        this.correo = user.correo;
        this.role = user.role;
        this.date = user.date;
        this.preferencias = user.preferencias;
        this.resultados = user.resultados;
        this.informacion = user.informacion ? user.informacion : [];
        this.identificacion = user.identificacion;
        this.genero = user.genero;
        this.prueba = user.prueba;
        this.interacciones = [];

        
    }

    addInteraction(interaction: ResultadoInteraction, onAdded: () => void) {
        const DR = DBRoutes.RESULTADOS;
        const UID = this.UID;
        const UIDInteraction = interaction.UID;

        const resultados: ResultadoInteractionSimple = {
            UID: interaction.UID,
            UIDUser: interaction.UIDUser,
            UIDActivity: interaction.UIDActivity,
            estado: interaction.estado,
            fecha: interaction.fecha,
            maximos: interaction.maximos,
            porcentajes: interaction.porcentajes,
            resultados: interaction.resultados
        }

        Database.writeDatabase([
            DR._THIS,
            DR.PUNTAJE,
            UID,
            UIDInteraction
        ], JSON.stringify(resultados), () => {
            Database.writeDatabase([
                DR._THIS,
                DR.DATA,
                UID,
                UIDInteraction
            ], interaction, () => {


                this.updatePrincipalResult(interaction.fecha, () => {
                    onAdded()
                })
            })
        })
    }

    updatePrincipalResult(fecha: { inicio: number, fin: number }, load: () => void) {

        const DR = DBRoutes.RESULTADOS;
        const DU = DBRoutes.USER;
        const UID = this.UID;

        Database.readBrachOnlyDatabaseVal([
            DR._THIS,
            DR.PUNTAJE,
            UID
        ], (sResult) => {

            var datos = new Map<string, ResultadoInteractionSimple>();

            Object.entries<string>(sResult).forEach(([key, result]) => {
                datos.set(key, JSON.parse(result));
            });


            var resultados = Registro.calculatePonderado(datos);
            var maximo = Registro.calculateMaximo(datos);

            const porcentaje = calculatePorcentaje(resultados, maximo);

            const dataResult: IDataResult = {
                fecha,
                result: {
                    global: resultados,
                    porcentaje,
                    maximo
                }

            }

            Database.writeDatabase([
                DU._THIS,
                DU.INFORMATION,
                UID,
                "resultados"
            ], dataResult, () => {
                load();
            });

        })
    }

    getAllInteracciones() {
        //Codigo pendiente
    }


}

export default Usuario;