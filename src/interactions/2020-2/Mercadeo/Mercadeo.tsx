import React, { useEffect, useRef } from "react";

import Main from './src/Main';
import { ActividadContextProvider } from '../../../components/Interaccion/ActividadContext';
import ActividadContext from '../../../components/Interaccion/ActividadContext';



const Mercadeo = () => {
  return <ActividadContextProvider>
    <ActividadLoad />
  </ActividadContextProvider>
}

const ActividadLoad = () => {
  const { getActividad, useNavegador } = ActividadContext();
  const [navegador] = useNavegador();
  const actividad = getActividad();

  useEffect(() => {

    var aplication = navegador.initProcessing();
    var app = aplication.getApp();

    if (actividad)
      navegador.addPROCESSING(new Main(app, actividad, navegador));

  }, []);

  return <></>;
}

export default Mercadeo;