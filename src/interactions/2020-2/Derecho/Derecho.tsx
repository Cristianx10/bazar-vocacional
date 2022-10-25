import React, { useEffect, useRef } from "react";

import Main from './src/Main';
import { ActividadContextProvider } from '../../../components/Interaccion/ActividadContext';
import ActividadContext from '../../../components/Interaccion/ActividadContext';




const Derecho = () => {
  return <ActividadContextProvider>
    <ActividadLoad />
  </ActividadContextProvider>
}

const ActividadLoad = () => {
  const { getActividad, useNavegador } = ActividadContext();
  const actividad = getActividad();

  const [navegador] = useNavegador()

  useEffect(() => {


    var aplication = navegador.initProcessing();
    aplication.size(1200, 700);
    var app = aplication.getApp();

    if(actividad)
    navegador.addPROCESSING(new Main(app, actividad, navegador));


  }, []);

  return <></>;
}

export default Derecho;