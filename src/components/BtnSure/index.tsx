import "./index.scss";
import { useState } from 'react';

const BtnSure = ({ onClick = () => { } }) => {

    const [isDelete, setIsDelete] = useState(false)

    return <div>
        {isDelete ?
            <>
                <button type="button" className="btn btn-danger"
                    onClick={() => {
                        setIsDelete(false)
                        onClick()
                    }}
                >Eliminar</button>
                <button type="button" className="btn btn-secondary"
                    onClick={() => {
                        setIsDelete(false)
                    }}
                >Cancelar</button>
            </>
            :
            <button type="button" className="btn btn-danger"
                onClick={() => {
                    setIsDelete(true)
                }}
            >Eliminar</button>
        }
    </div>
}

export default BtnSure;