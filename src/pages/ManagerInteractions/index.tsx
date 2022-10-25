import "./index.scss"
import { useEffect, useState } from 'react';
import UserFirebase from '../../constants/firebase/user/index';

const ManagerInteractions = () => {

    const [] = useState([]);

    useEffect(() => {

        const usuario = UserFirebase.usuario;
        if (usuario) {


            usuario.getAllInteracciones((interacciones) => {

            })
        }

    }, [])

    return <div className="ManagerInteractions">
        <h1>Intraraiond</h1>
    </div>
}

export default ManagerInteractions;