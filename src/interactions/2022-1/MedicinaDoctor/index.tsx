import "./index.scss";
import { useEffect } from "react";


import Instrucciones1, { Instrucciones2, Instrucciones3, Instrucciones4, Instrucciones5 } from './src/Pantallas/instrucciones';
import Game from "./src/Pantallas/game";
import ImageController from './src/Components/imageController';
import Registro from './src/registro';
import { ActividadContextProvider } from '../../../components/Interaccion/ActividadContext';
import ActividadContext from '../../../components/Interaccion/ActividadContext';


const MedicinaDoctor = () => {
    return <ActividadContextProvider>
        <ActividadLoad />
    </ActividadContextProvider>
}

export interface IData { img: ImageController, puntajeFinal: number, registros: Registro[] }

const ActividadLoad = () => {
    const { getActividad, useNavegador } = ActividadContext();
    const actividad = getActividad();
    const [navegador] = useNavegador();

    useEffect(() => {

        const app = navegador.initProcessing().app;

        var data: IData = {
            img: new ImageController(app),
            puntajeFinal: 0,
            registros: []
        }

        if (actividad) {

            navegador.addPROCESSING(new Instrucciones1(app, actividad, navegador));
            navegador.addPROCESSING(new Instrucciones2(app, actividad, navegador));
            navegador.addPROCESSING(new Instrucciones3(app, actividad, navegador, app.loadImage('/img/2021-1/MedicinaDoctor/img/medicina/recursos/1ra interaccion.png'), app.loadImage('/img/2021-1/MedicinaDoctor/video/2dainteraccion.gif')));
            navegador.addPROCESSING(new Instrucciones3(app, actividad, navegador, app.loadImage('/img/2021-1/MedicinaDoctor/video/3rainteraccion.gif'), app.loadImage('/img/2021-1/MedicinaDoctor/img/medicina/recursos/4ta interaccion.png')));
            navegador.addPROCESSING(new Instrucciones3(app, actividad, navegador, app.loadImage('/img/2021-1/MedicinaDoctor/img/medicina/recursos/5ta interaccion.png')));
            navegador.addPROCESSING(new Instrucciones4(app, actividad, navegador));
            navegador.addPROCESSING(new Game(app, actividad, navegador, data));
            navegador.addPROCESSING(new Instrucciones5(app, actividad, navegador, data));
        }
        navegador.goTo(0);

    }, []);

    return <></>
}


export default MedicinaDoctor;