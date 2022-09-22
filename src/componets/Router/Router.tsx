import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "../../pages/Index"
import Preload from '../../pages/Preload/index';
import LINK from './Routes';
import AppContext from '../App/AppContext';


const Router = () => {

    const { usePreload, useLogin } = AppContext();
    const [preload, setPreload] = usePreload();
    const [login, setLogin] = useLogin();

    return <BrowserRouter>
        <Routes>
          
                {preload === "Loading" ?
                    <Preload />
                    :
                    <>
                        {login.isLogin ?
                            <>
                              
                            </>
                            :
                            <>
                               
                            </>}
                        <Route path={LINK.INDEX} element={<Index />} />
                    </>

                }
           
        </Routes>


    </BrowserRouter>
}

export default Router;