import React, { useEffect, useRef } from "react";
import Main from './src/Main';
import { ActividadContextProvider } from '../../../components/Interaccion/ActividadContext';
import ActividadContext from '../../../components/Interaccion/ActividadContext';


const Botanica = () => {
  return <ActividadContextProvider>
    <ActividadLoad />
  </ActividadContextProvider>
}

const ActividadLoad = () => {
  const { getActividad, useNavegador } = ActividadContext();
  const actividad = getActividad();
  const [nav] = useNavegador()

  useEffect(() => {


    var aplication = nav.initProcessing();
    var app = aplication.getApp();

    if (actividad) {
      nav.addPROCESSING(new Main(app, actividad));
    }


  }, []);

  return <></>;
}

export default Botanica;