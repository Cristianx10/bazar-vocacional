import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Index from "../../pages/Index"
import Home from "../../pages/Home"
import Preload from '../../pages/Preload/index';
import LINK from './Routes';
import AppContext from '../App/AppContext';
import Registro from '../../pages/Registro/Registro';
import Interaccion from '../Interaccion/Interaccion';
import Interacciones20221 from '../../constants/simulations/2022-1/Interacciones20221';
import ChooseCarreras from '../../pages/ChooseCarreras/index';
import { useEffect } from 'react';
import Perfil from '../../pages/Perfil/Perfil';
import { Navigate } from "react-router";
import UserFirebase from '../../constants/firebase/user/index';
import Resultados from '../../pages/Resultados/index';




const Router = () => {

    const { usePreload, useLogin, useInteraccion } = AppContext();
    const [preload, setPreload] = usePreload();
    const [login, setLogin] = useLogin();

    const [interaccion] = useInteraccion()

    useEffect(() => {

    }, [])

    return preload === "Loading" ?
        <Preload />
        :
        <>
            <BrowserRouter>
                <Routes>

                    {login.isLogin ?
                        <>
                            <Route path={LINK.INDEX} element={<Home />} />
                            <Route path={LINK.PERFIL} element={<Perfil />} />
                            <Route path={LINK.RESULTADOS} element={<Resultados />} />
                        </> 
                        : <>
                            <Route path={LINK.INDEX} element={<Index />} />
                            <Route path={LINK.REGISTRO} element={<Registro />} />
                        </>}

                    {interaccion ?
                        <Route path={LINK.INTERACCION} element={<Interaccion interaccion={interaccion} onFinish={(interaccion) => {
                            const r = interaccion.getResultado()
                            const usuario = UserFirebase.usuario;
                            if (usuario) {
                                UserFirebase.usuario?.addInteraction(r, () => {
                                    console.log("FINALIZADO", r)
                                });
                            }

                       
                        }} />} />
                        :
                        <Route path={LINK.INTERACCION} element={<Navigate to={LINK.INDEX} />} />
                    }

                </Routes>


            </BrowserRouter>
        </>


}

export default Router;