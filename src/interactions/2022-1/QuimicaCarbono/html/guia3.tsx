import React from "react";
import { RPath } from "../index";

const Guia3 = ({ goToPage }: { goToPage: (value: string | number) => void }) => {

    return <div className="body">
        <main className="container">

            <img src={RPath + "data/Guía3.png"} />
            <div className="guia2 btnContainer">

                <button onClick={() => goToPage("guia2")} className="btnSecundary">Atrás </button>
                <button onClick={() => goToPage("guia4")} className="btnMain">Siguiente </button>


            </div>

        </main>

    </div>
}

export default Guia3;