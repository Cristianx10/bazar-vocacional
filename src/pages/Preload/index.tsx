import "./index.scss"
import AppContext from "../../componets/App/AppContext";
import { useEffect } from "react";
import UserFirebase from "../../constants/firebase/user";


const Preload = () => {

    const { usePreload, useLogin } = AppContext();
    const [preload, setPreload] = usePreload();
    const [login, setLogin] = useLogin()

    useEffect(() => {

        UserFirebase.getUserChangeLocal((login) => {

            setLogin({ isLogin: login, role: UserFirebase.usuario ? UserFirebase.usuario.role : "" })
            setPreload("Complete")
        })



    }, [])

    return <div className="Preload backgroundImage" style={{ backgroundImage: "url(/includes/background/oscuro.png)" }}>
        <h1>CARGANDO PAGINA....</h1>
    </div>
}

export default Preload;