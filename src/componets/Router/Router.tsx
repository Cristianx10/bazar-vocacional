import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "../../pages/Index"
import Preload from '../../pages/Preload/index';
import LINK from './Routes';
import AppContext from '../App/AppContext';
import Registro from '../../pages/Registro/Registro';
import Interaccion from '../Interaccion/Interaccion';



const Router = () => {

    const { usePreload, useLogin } = AppContext();
    const [preload, setPreload] = usePreload();
    const [login, setLogin] = useLogin();

    return preload === "Loading" ?
        <Preload />
        :
        <>
            <BrowserRouter>
                <Routes>
                    {login.isLogin ?
                        <>

                        </>
                        :
                        <>

                        </>}
                    <Route path={LINK.INDEX} element={<Index />} />
                    <Route path={LINK.REGISTRO} element={<Registro />} />
                    <Route path={LINK.INTERACCION} element={<Interaccion type="EXTERNA" />} />
                </Routes>


            </BrowserRouter>
        </>


}

export default Router;