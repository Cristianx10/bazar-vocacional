import ActividadTSLite from './ActividadTSLite';
import { IComunicacionIframaMessage } from '../../../componentsTS/ComunicacionIFrame/index';
import ComunicacionIFrame from '../../../componentsTS/ComunicacionIFrame/index';
import { ResultadoInteraction, ResultadoPuntuacion, ResultadoUser } from '../../../constants/resultados/types';
import InteractionStructure from '../../../constants/simulations/types/InteractionStructure';
import UserFirebase from '../../../constants/firebase/user/index';
import Database from '../../../constants/firebase/database/index';
import { IEstado } from '../../../constants/estados/EstadoManager';
import { ActivityLiteResult } from './ActividadTSLite';
import DBRoutes from '../../../constants/firebase/database/DBRoutes';
import { calculatePorcentaje } from '../../../constants/helpers/index';




class ActividadTS {

    actividad: ActividadTSLite;
    info: InteractionStructure;

    constructor(info: InteractionStructure) {
        this.info = info;
        this.actividad = new ActividadTSLite();
    }

    initIframe(HTMLIframe: HTMLIFrameElement) {

        this.actividad.init(() => {

            var comunicacion = new ComunicacionIFrame<IComunicacionIframaMessage>(HTMLIframe);
            comunicacion.onInit(() => {

            });

            comunicacion.setObserver((data) => {

                console.log("Recibido desde RECEPTOR", data)

                if (typeof data !== "string") {


                    if (data.type === "SAVE_ACTIVITY") {
                        const objeto = data.data as ActivityLiteResult;
                        this.actividad.loadData(objeto)
                    }


                    if (data.type === "FINISH_ACTIVITY") {
                        const objeto = data.data as ActivityLiteResult;
                        this.actividad.loadData(objeto)

                        this.actividad.isFinalizado = false;
                        this.actividad.comunicacion = undefined;

                        this.actividad.finish();
                    }
                } else {

                    if (data === "GET_ACTIVITY") {

                        const result = this.actividad.getData();

                        comunicacion.onSend({
                            type: "GET_ACTIVITY",
                            data: result
                        })

                    }

                }

            })
        }, "INTERNA")

    }

    init() {

    }

    getResultado(): ResultadoInteraction {

        //Revisar ruta de generacion
        const RR = DBRoutes.RESULTADOS;

        const UIDUser = UserFirebase.getUID();
        const UID = Database.generateUID([RR._THIS, RR.DATA, UIDUser]);
        const UIDActivity = this.info.UID;

        const fecha = this.actividad.medicion.date;
        const estado = this.actividad.medicion.estado;
        const resultados = this.actividad.resultados;

        const maximos = this.actividad.maximos;
        const data = this.actividad.medicion.toJSON();
        const informacion = this.actividad.informacion;

        const porcentajes = calculatePorcentaje(maximos, resultados);
        

        var result: ResultadoInteraction = {
            UID,
            UIDUser,
            UIDActivity,
            fecha,
            estado,
            resultados,
            maximos,
            data,
            informacion,
            porcentajes
        }

        return result;
    }

    onFinish(fOnFinish?: (result: ActivityLiteResult) => void) {
        this.actividad.onFinish(fOnFinish)
    }

    getActivity() {
        return this.actividad;
    }

}

export default ActividadTS;