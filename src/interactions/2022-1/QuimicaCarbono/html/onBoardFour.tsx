import React from "react";
import { RPath } from "../index";

const OnBoardFour =({ goToPage }: { goToPage: (value: string | number) => void }) => {

    return <div className="body">

        <main className="container">

            <video src={RPath + "data/Instruccion4.mp4"} width="1160" height="600" autoPlay loop></video>

            <button onClick={() => goToPage("guia1")} className="btnNext2"> Siguiente </button>

        </main>
    </div>
}

export default OnBoardFour;