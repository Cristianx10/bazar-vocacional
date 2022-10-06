import { BrowserRouter, Route, Routes } from "react-router-dom"
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



const Router = () => {

    const { usePreload, useLogin } = AppContext();
    const [preload, setPreload] = usePreload();
    const [login, setLogin] = useLogin();

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
                        </>
                        : <>
                            <Route path={LINK.INDEX} element={<Index />} />
                            <Route path={LINK.REGISTRO} element={<Registro />} />
                        </>}

                    <Route path={LINK.INTERACCION} element={<Interaccion interaccion={Interacciones20221[0]} onFinish={(interaccion) => {
                        const r = interaccion.getResultado()
                        console.log("FINALIZADO", r)
                    }} />} />
                </Routes>


            </BrowserRouter>
        </>


}

export default Router;