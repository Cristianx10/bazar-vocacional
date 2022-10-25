import React from "react";
import { RPath } from "../index";

const Guia2 = ({ goToPage }: { goToPage: (value: string | number) => void }) => {

    return <div className="body">
        <main className="container">

            <img src={RPath + "data/Guía2.png"} />
            <div className="guia2 btnContainer">

                <button onClick={() => goToPage("guia1")} className="btnSecundary">Atrás </button>
                <button onClick={() => goToPage("guia3")} className="btnMain">Siguiente </button>
            </div>

        </main>
    </div>
}

export default Guia2;