import React from "react";
import { RPath } from "../index";

const Guia6 = ({ goToPage }: { goToPage: (value: string | number) => void }) => {

    return <div className="body">
        <main className="container">

            <img src={RPath + "data/Guía6.png"} />
            <div className="guia2 btnContainer">

                <button onClick={() => goToPage("guia5")} className="btnSecundary">Atrás </button>
                <button onClick={() => goToPage("juego")} className="btnMain">Siguiente </button>
            </div>

        </main>

    </div>
}

export default Guia6;