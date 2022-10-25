import React, { useEffect, useRef } from "react";
import Main from './src/Main';
import "./css/main.scss";
import "./index.scss";
import { ActividadContextProvider } from '../../../components/Interaccion/ActividadContext';
import ActividadContext from '../../../components/Interaccion/ActividadContext';


const Loros = () => {
  return <ActividadContextProvider>
    <ActividadLoad />
  </ActividadContextProvider>
}

const ActividadLoad = () => {
  const { getActividad, useNavegador } = ActividadContext();
  const actividad = getActividad();
  const [nav] = useNavegador();


  const refContainer = useRef<any>()

  useEffect(() => {
    var aplication = nav.initProcessing();
    var app = aplication.getApp();


    if (actividad) {
      var main = new Main(app, actividad, nav);
      nav.addPROCESSING(main);

    
      // main.setPantalla(pantalla);
    }

    nav.setContainer(refContainer.current)
  }, []);

  return <div className="Loros backgroundImage" style={{ backgroundImage: "url('/includes/background/claro.png')" }}>
    <div className="Loros__container" ref={refContainer}></div>
  </div>;
}

export default Loros;