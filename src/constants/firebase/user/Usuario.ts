import { ResultadoInteraction, ResultadoPuntuacion, ResultadoInteractionSimple } from '../../resultados/types';
import DBRoutes from '../database/DBRoutes';
import Database from '../database/index';
import { calculatePorcentaje } from '../../helpers/index';
import Registro from '../../resultados/Registro';
type TRoles = "LOCAL" | "ADMINISTRADOR" | "EDITOR" | "VISOR" | "";

export interface IUserInformation {
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
    activitysRegister: string[];
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
    interacciones: ResultadoInteractionSimple[];
    resultados: IDataResult;

    activitysRegister: string[];

    constructor(user: IUsuario) {
        this.UID = user.UID;
        this.nombre = user.nombre;
        this.correo = user.correo;
        this.role = user.role;
        this.date = user.date;
        this.preferencias = user.preferencias ? user.preferencias : [];
        this.resultados = user.resultados ? user.resultados : {
            fecha: { inicio: 0, fin: 0 },
            result: {
                global: [],
                maximo: [],
                porcentaje: [],
            }
        };
        this.informacion = user.informacion ? user.informacion : [];
        this.identificacion = user.identificacion;
        this.genero = user.genero;
        this.prueba = user.prueba;
        this.interacciones = [];

        this.activitysRegister = user.activitysRegister ? user.activitysRegister : [];
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

    getOrdenCarreras(): { global: ResultadoPuntuacion, maximo: ResultadoPuntuacion, porcentaje: ResultadoPuntuacion }[] {
        const resultados = [...this.resultados.result.global];
        const porcentajes = [...this.resultados.result.porcentaje];
        const maixmos = [...this.resultados.result.maximo];

        const resultMap = new Map<string, { global: ResultadoPuntuacion, maximo: ResultadoPuntuacion, porcentaje: ResultadoPuntuacion }>();

        resultados.forEach(({ id, value }) => {
            var results = resultMap.get(id);
            if (results === undefined) {
                results = {
                    global: { id: "", value: -1 },
                    maximo: { id: "", value: -1 },
                    porcentaje: { id: "", value: -1 }
                }
            }
            resultMap.set(id, { ...results, global: { id, value } })
        })

        porcentajes.forEach(({ id, value }) => {
            var results = resultMap.get(id);
            if (results === undefined) {
                results = {
                    global: { id: "", value: -1 },
                    maximo: { id: "", value: -1 },
                    porcentaje: { id: "", value: -1 }
                }
            }
            resultMap.set(id, { ...results, porcentaje: { id, value } })
        })


        maixmos.forEach(({ id, value }) => {
            var results = resultMap.get(id);
            if (results === undefined) {
                results = {
                    global: { id: "", value: -1 },
                    maximo: { id: "", value: -1 },
                    porcentaje: { id: "", value: -1 }
                }
            }
            resultMap.set(id, { ...results, maximo: { id, value } })
        })

        var carreras: { global: ResultadoPuntuacion, maximo: ResultadoPuntuacion, porcentaje: ResultadoPuntuacion }[] = []

        resultMap.forEach((value, key) => {
            carreras.push(value);
        })

        carreras.sort((a, b) => {
            return b.porcentaje.value - a.porcentaje.value;
        })



        return carreras;
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

    getAllInteracciones(load: () => void) {
        //Codigo pendiente
        const DR = DBRoutes.RESULTADOS;
        const UID = this.UID;


        Database.readBrachOnlyDatabaseVal([
            DR._THIS, DR.PUNTAJE, UID
        ], (sData) => {

            this.interacciones = [];

            Object.values<string>(sData).forEach((data) => {
                this.interacciones.push(JSON.parse(data))
            })



            load();
        })

        return this.interacciones;
    }

    getOrdenInteracciones(): ResultadoInteractionSimple[][] {

        var interaccionesArray: ResultadoInteractionSimple[][] = [];
        var interaccionesMap = new Map<string, ResultadoInteractionSimple[]>()
        this.interacciones.forEach((interaccion) => {

            interaccion.resultados.forEach((result) => {
                var actividad = interaccionesMap.get(result.id);
                if (actividad === undefined) {
                    interaccionesMap.set(result.id, []);
                    actividad = interaccionesMap.get(result.id);
                }
                if (actividad) {
                    var interac = Object.assign({}, interaccion);
                    interac.resultados.sort((a, b) => {
                        return b.value - a.value;
                    })
                    actividad.push(interac)
                }
            })
        })

        // console.log(interaccionesMap, interaccionesArray)

        interaccionesMap.forEach((interacciones, key) => {
            interacciones.sort((a, b) => {

                var rA = 0;
                var rB = 0;
                a.resultados.forEach(r => {
                    if (key === r.id) {
                        rA = r.value;
                    }
                })

                b.resultados.forEach(r => {
                    if (key === r.id) {
                        rB = r.value;
                    }
                })
                return rB - rA;
            })

            interaccionesArray.push(interacciones);
        })

        interaccionesArray.sort((a, b) => {
            var rA = 0;
            var rB = 0;

            if (b.length > 0 && b[0].resultados && b[0].resultados.length > 0 && a.length > 0 && a[0].resultados && a[0].resultados.length > 0) {
                return b[0].resultados[0].value - a[0].resultados[0].value;
            } else {
                return 0
            }


        })

        // console.log(interaccionesMap, interaccionesArray)


        return interaccionesArray;

    }

    getPreferencias() {
        return this.preferencias;
    }

    setPreferencias(preferencias: string[], load?: () => void) {
        const RU = DBRoutes.USER;
        this.preferencias = preferencias;
        Database.writeDatabase([
            RU._THIS,
            RU.INFORMATION,
            this.UID,
            "preferencias"
        ], preferencias, load)
    }

    getInformation() {
        return this.informacion;
    }

    setInformacion(informacion: IUserInformation[], load?: () => void) {
        const RU = DBRoutes.USER;
        this.informacion = informacion;
        Database.writeDatabase([
            RU._THIS,
            RU.INFORMATION,
            this.UID,
            "informacion"
        ], informacion, load)
    }

    getActivitysRegister() {
        return this.activitysRegister;
    }

    setActivitysRegisters(activitysRegister: string[], load?: () => void) {
        const RU = DBRoutes.USER;
        this.activitysRegister = activitysRegister;
        Database.writeDatabase([
            RU._THIS,
            RU.INFORMATION,
            this.UID,
            "activitysRegister"
        ], activitysRegister, load)
    }

    getActivitysRegisterId(id: string) {
        let encontro =false;
        this.activitysRegister.forEach(a=>{
            if(id === a){
                encontro = true;
            }
        })
        return encontro;
    }




}

export default Usuario;