import Registro from '../../../constants/resultados/Registro';
import InteractionStructure from '../../../constants/simulations/types/InteractionStructure';
import DBRoutes from '../../../constants/firebase/database/DBRoutes';
import ListGeneral from '../../../constants/simulations/ListGeneral';


interface IInteractionTest {
    UID: string;
    UIDActivity: string;
    interaccion: InteractionStructure;
    props?: Object;
    config?: Object | Array<Object>;
}

export interface IInteractionTestFirebase {
    UID: string;
    UIDActivity: string;
    props?: Object;
    config?: Object | Array<Object>;
}

class ObserverNav {

    interacciones: IInteractionTest[];
    index: number;
    currentInteraction?: IInteractionTest;
    registro: Registro;

    constructor() {
        this.interacciones = [];
        this.index = -1;
        this.registro = new Registro("resultados");
        console.log("OBSERVANDO")
    }

    onNext(): IInteractionTest | undefined {
        if (this.index + 1 < this.interacciones.length) {
            this.index++
            const index = this.index;
            this.registro.nav.index = index;
            const interaccion = this.interacciones[index];
            this.currentInteraction = interaccion;

            return this.currentInteraction;
        } else {
            this.onFinalizar();
            return undefined
        }
    }

    onBack() {

    }

    private fonTestFinish?: (state: boolean) => void;
    onTestFinish(fonTestFinish?: (state: boolean) => void) {
        this.fonTestFinish = fonTestFinish;
        if (this.fonTestFinish) {
            this.fonTestFinish(this.registro.nav.database)
        }
    }

    onFinalizar() {
        const RR = DBRoutes.RESULTADOS;
        const { UIDTest, UIDUser } = this.registro;

        this.registro.finish((state) => {
            if (this.fonTestFinish) {
                this.fonTestFinish(state)
            }
        });

    }

    loadInfoTest() {
        this.registro.loadInfoTest(this.index + 1)
    }

    loadInformationTest(allData: IInteractionTestFirebase[]) {

        allData.forEach((data) => {

            const interacion = Object.assign({}, ListGeneral.get(data.UIDActivity));

            if (interacion) {
                const actividad: IInteractionTest = { ...data, interaccion: interacion }
                this.interacciones.push(actividad);
            }
        })

    }



}

export default ObserverNav;