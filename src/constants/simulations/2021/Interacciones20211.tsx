import InteractionStructure from "../types/InteractionStructure";

import CARRERAS from '../types/Carreras';
import MedicinaDoctor from "../../../interactions/2022-1/MedicinaDoctor";
import QuimicaCarbono from '../../../interactions/2022-1/QuimicaCarbono/index';
import Music from '../../../interactions/2022-1/Music/index';
import BallSort from '../../../interactions/2022-1/BallSort/index';
import Matching3D from '../../../interactions/2022-1/3DMatching/index';


const Interacciones20211: InteractionStructure[] = [];

const InteraccionMedicinaDoctor: InteractionStructure = {
    UID: "27a9b230-a636-11eb-bcbc-0242ac130002",
    type: "INTERNA",
    date: "01-10-2021",
    title: "Medicina Doctor",
    image: "/includes/preview/version4/medicina-doctor.PNG",
    actividad: () => <MedicinaDoctor />,
    tags: [CARRERAS.MEDICINA],
    defaultMaximos: [
        { id: CARRERAS.MEDICINA, value: 200 }
    ]
}

Interacciones20211.push(InteraccionMedicinaDoctor);



const Interaccion3DMatching: InteractionStructure = {
    type: "INTERNA",
    date: "01-10-2021",
    UID: "f60c160a-3236-47d7-b64d-f1f6b8fc9d64",
    title: "3D Matching",
    image: "/includes/preview/version4/3d-matching.PNG",
    actividad: () => <Matching3D />,
    tags: [CARRERAS.DISENO_INDUSTRIAL],
    defaultMaximos: [
        { id: CARRERAS.DISENO_INDUSTRIAL, value: 200 }
    ]
}

Interacciones20211.push(Interaccion3DMatching);



const InteraccionBallSort: InteractionStructure = {
    type: "INTERNA",
    date: "01-10-2021",
    UID: "e4b585a2-0fc3-493e-9faf-128d63080411",
    title: "Ball sort",
    image: "/includes/preview/version4/ball-sort.PNG",
    actividad: () => <BallSort />,
    tags: [CARRERAS.INGENIERIA_SISTEMAS],
    defaultMaximos: [
        { id: CARRERAS.INGENIERIA_SISTEMAS, value: 200 }
    ]
}

Interacciones20211.push(InteraccionBallSort);

const InteraccionMusic: InteractionStructure = {
    type: "INTERNA",
    date: "01-10-2021",
    UID: "35a34dcc-14c0-4fb9-a8ad-f500a8526f85",
    title: "Musica 2021",
    image: "/includes/preview/version4/music.PNG",
    actividad: () => <Music />,
    tags: [CARRERAS.MUSICA],
    defaultMaximos: [
        { id: CARRERAS.MUSICA, value: 200 }
    ]
}

Interacciones20211.push(InteraccionMusic);

//PENDIENTE
const InteraccionQuimicaCarbono: InteractionStructure = {
    type: "INTERNA",
    date: "01-10-2021",
    UID: "378d09bd-1369-4ec1-9ef1-3090d58c6a74",
    title: "Quimica Carbono",
    image: "/includes/preview/version4/quimica-carbono.PNG",
    actividad: () => <QuimicaCarbono />,
    tags: [CARRERAS.QUIMICA],
    defaultMaximos: [
        { id: CARRERAS.QUIMICA, value: 200 }
    ]
}

//Interacciones20211.push(InteraccionQuimicaCarbono);



export default Interacciones20211;