import UserFirebase from "../../constants/firebase/user";
import AppContext from "../App/AppContext";
import Interaccion from "../Interaccion/Interaccion";
import { useEffect, useState } from 'react';
import InteractionStructure from '../../constants/simulations/types/InteractionStructure';
import ListGeneral from '../../constants/simulations/ListGeneral';
import ActividadTS from '../Actividad/config/ActividadTS';
import { InteractionStructureChild } from '../../constants/simulations/types/InteractionStructure';

import { create_UUID } from "../../constants/helpers/utils";
import Database from "../../constants/firebase/database";
import DBRoutes from "../../constants/firebase/database/DBRoutes";
import { useNavigate } from 'react-router';
import LINK from '../Router/Routes';

const InteractionComponent = () => {

    const { usePreload, useLogin, useInteraccion } = AppContext();
    const [interaccion] = useInteraccion();

    const navigate = useNavigate()

    const [beforeIndex, setBeforeIndex] = useState(-1);
    const [isFinish, setIsFinist] = useState(false);
    const [afterIndex, setAfterIndex] = useState(-1);

    const [actual, setActual] = useState<InteractionStructure | undefined>(undefined);
    const [counter, setCounter] = useState(0)

    const findInteraction = (info: InteractionStructureChild) => {

        if (!info) {
            return undefined;
        }

        const refInteraccion = ListGeneral.get(info.refUID)
        if (refInteraccion) {
            const interaccion = Object.assign({}, refInteraccion);
            interaccion.config = info.config;
            interaccion.uniqueUID = info.UID;
            interaccion.repeat = info.repeat;

            return interaccion;
        }
        return undefined;
    }

    useEffect(() => {

        next();
    }, [counter])

    const next = () => {
        const usuario = UserFirebase.usuario;

        if (interaccion) {

            const beforeActivitys = interaccion.beforeActivitys;
            const afterActivitys = interaccion.afterActivitys;

            const newIndexBefore = beforeIndex + 1;
            const newIndexAfter = afterIndex + 1;

            if (beforeActivitys && newIndexBefore < beforeActivitys.length) {

                setBeforeIndex(newIndexBefore);

                const refActivityInfo = beforeActivitys[newIndexBefore];
           
                if ((refActivityInfo.repeat === false && usuario && usuario.getActivitysRegisterId(refActivityInfo.UID) === false) 
                || refActivityInfo.repeat === true) {

                    const nextInteraction = findInteraction(refActivityInfo);
                    setActual(nextInteraction);

                    console.log("NEXT BEFORE", newIndexBefore, nextInteraction !== actual)
                } else {
                    setCounter(counter + 1);
                }



            } else if (isFinish === false) {

                setActual(interaccion)
                setIsFinist(true);

                console.log("NEXT NORMAL")

            } else if (afterActivitys && newIndexAfter < afterActivitys.length) {

                setAfterIndex(newIndexAfter)

                const refActivityInfo = afterActivitys[newIndexAfter];

               

                if ((refActivityInfo.repeat === false && usuario && usuario.getActivitysRegisterId(refActivityInfo.UID) === false)
                || refActivityInfo.repeat === true) {
                    const nextInteraction = findInteraction(refActivityInfo);
                    setActual(nextInteraction)

                    console.log("NEXT AFTER", newIndexAfter)
                } else {
                    setCounter(counter + 1);
                }

            } else {
                console.log("TERMINADO")
                navigate(LINK.INDEX)
            }
        }
    }


    const onFinish = (actividad: ActividadTS) => {

        const saveDatabase = () => {
            const r = actividad.getResultado()
            const usuario = UserFirebase.usuario;
            if (usuario) {
                usuario.addInteraction(r, () => {
                    console.log("FINALIZADO", r)

                    next();
                });
            }
        }


        if (actividad.info.repeat === false && actividad.info.uniqueUID) {

            const usuario = UserFirebase.usuario;
            if (usuario) {
                usuario.setActivitysRegisters([...usuario.getActivitysRegister(), actividad.info.uniqueUID], () => {
                    saveDatabase()
                })
            }
        } else {
            saveDatabase()
        }




    }

    if (!actual) {
        return <></>
    }

    return <Interaccion key={create_UUID("xxxx-xxxx-xxxx-xxxx")} interaccion={actual} onFinish={onFinish} />
}

export default InteractionComponent;