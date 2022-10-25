import React from "react";
import { RPath } from "../index";

const InstruccionFour = ({ goToPage }: { goToPage: (value: string | number) => void }) => {

    return <div className="body">
        <main className="container">
            <img src={RPath + "data/Instruccion4.png"} />

            <button onClick={() => goToPage("onBoardFour")} className="btnNext3">Siguiente </button>
        </main>

    </div>
}

export default InstruccionFour;