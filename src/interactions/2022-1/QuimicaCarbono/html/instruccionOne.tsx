import React from "react";
import { RPath } from "../index";

const InstruccionOne = ({ goToPage }: { goToPage: (value: string | number) => void }) => {

    return <div className="body">
        <main className="container">

            <img src={RPath + "data/instruccionOne.png"} />

            <button onClick={() => goToPage("onBoardOne")} className="btnPlay2">Siguiente </button>
        </main>


    </div>
}

export default InstruccionOne;