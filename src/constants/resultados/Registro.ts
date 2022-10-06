import Database from "../firebase/database";
import DBRoutes from "../firebase/database/DBRoutes";
import { ResultadoInteraction, ResultadoPuntuacion, ResultadoUser, ResultadoInteractionSimple } from './types';

export interface IRegistroLoad {
    UIDTest: string | undefined;
    UIDUser: string | undefined;
    time: {
        inicial: number;
        final: number;
    };
    nav: {
        index: number;
        finish: boolean;
        database: boolean;
    };
    userInformation: ResultadoUser[];
    datos: {
        key: string;
        value: ResultadoInteraction;
    }[];
    resultados: ResultadoPuntuacion[];
    maximos: ResultadoPuntuacion[];
    porcentajes: ResultadoPuntuacion[];
}

class Registro {

    UIDUser?: string;
    UIDTest?: string;
    IDLocal: string;

    nav: { index: number, finish: boolean, database: boolean }

    time = {
        inicial: -1,
        final: -1
    }

    userInformation: ResultadoUser[] = [];
    datos: Map<string, ResultadoInteraction>;

    resultados: ResultadoPuntuacion[] = [];
    maximos: ResultadoPuntuacion[] = [];
    porcentajes: ResultadoPuntuacion[] = []

    constructor(IDLocal: string) {
        this.nav = { index: -1, finish: false, database: false }
        this.IDLocal = IDLocal;
        this.datos = new Map();

        this.time.inicial = (new Date()).getTime();

    }

    finish(load: (state: boolean) => void) {
        this.time.final = (new Date()).getTime();
        this.nav.finish = true;

        const UIDTest = this.UIDTest;
        const UIDUser = this.UIDUser;

        if (UIDTest && UIDUser && this.nav.database === false) {
            const RU = DBRoutes.RESULTADOS;
            const data = this.toJSON();
            Database.writeDatabase([RU._THIS, RU.DATA, UIDTest, UIDUser], JSON.stringify(data), () => {
                this.nav.database = true;
                load(true)

                this.save();
                this.updateMetadata()
            })
        }

        this.save();

        if (this.nav.database === false) {
            this.updateMetadata()
        }

    }



    addUserInfo(user: ResultadoUser[]) {

        var userTemp = new Map<string, number | string>()

        this.userInformation.forEach(({ id, value }) => {
            userTemp.set(id, value);
        });

        user.forEach(({ id, value }) => {
            userTemp.set(id, value);
        });

        var userResult: ResultadoUser[] = []
        userTemp.forEach((value, key) => {
            userResult.push({ id: key, value })
        })

        this.userInformation = userResult;


        this.save();

        this.updateDataUser();


    }

    updateDataUser() {
        const UIDTest = this.UIDTest;
        const UIDUser = this.UIDUser;

        if (UIDTest !== undefined && UIDUser !== undefined) {

            const RT = DBRoutes.TEST;
            const RB = DBRoutes.BACKUP;

            const value = {
                userInformation: [...this.userInformation]
            }

            Database.writeDatabase([RB._THIS, UIDTest, UIDUser, RB.USER], JSON.stringify(value))
        }
    }

    updateMetadata() {
        const UIDTest = this.UIDTest;
        const UIDUser = this.UIDUser;
        if (UIDTest !== undefined && UIDUser !== undefined) {

            const RT = DBRoutes.TEST;
            const RB = DBRoutes.BACKUP;

            const data = {
                UID: UIDUser,
                nav: { ...this.nav },
                time: {
                    ...this.time
                }
            }

            Database.writeDatabase([RB._THIS, UIDTest, UIDUser, RB.METADATA], JSON.stringify(data))
        }
    }

    loadInfoTest(indexTemp: number) {
        const UIDTest = this.UIDTest;
        const index = indexTemp;
        this.clearAll();

        if (UIDTest !== undefined && this.UIDUser === undefined) {
            const RR = DBRoutes.RESULTADOS;
            const UIDUser = Database.generateUID([RR._THIS, RR.INFORMATION, UIDTest])
            this.UIDTest = UIDTest;
            this.UIDUser = UIDUser;

            this.nav.index = index;

            const RT = DBRoutes.TEST;
            const RB = DBRoutes.BACKUP;

            const data = {
                UID: UIDUser,
                nav: { ...this.nav },
                time: {
                    ...this.time
                }
            }

            this.save()

            Database.writeDatabase([RB._THIS, UIDTest, UIDUser, RB.METADATA], JSON.stringify(data), () => {
                this.updateDataUser();
            })
        }

    }

    static calculateMaximo(datos: Map<string, ResultadoInteractionSimple>) {

        var resultMax = new Map<string, number>();

        datos.forEach(({ maximos }) => {
            maximos.forEach(({ id, value }) => {
                var result = resultMax.get(id);

                if (result === undefined) {
                    resultMax.set(id, 0);
                    result = resultMax.get(id);
                }

                if (result !== undefined) {
                    const valueResult = result + value;
                    resultMax.set(id, valueResult)
                }
            })
        })

        var maximos: ResultadoPuntuacion[] = [];
        resultMax.forEach((value, key) => {
            maximos.push({ id: key, value })
        })

        return maximos;
    }

    static calculateMaxPuntuacion(puntuacionesArray: ResultadoPuntuacion[][]) {

        var maximos = [] as ResultadoPuntuacion[];

        var puntuacionesArrayMap = [] as Map<string, ResultadoPuntuacion>[]
        var carrerasId = new Map<string, ResultadoPuntuacion[]>();

        puntuacionesArray.forEach((puntuaciones, index) => {

            var puntuacionesMap = new Map<string, ResultadoPuntuacion>();

            puntuaciones.forEach((puntuacion, j) => {
                const { id, value } = puntuacion;
                puntuacionesMap.set(id, puntuacion)
                carrerasId.set(id, [])
            })

            puntuacionesArrayMap.push(puntuacionesMap)

        })

        puntuacionesArrayMap.forEach((puntuaciones) => {
            carrerasId.forEach((carrera, key) => {
                const puntuacion = puntuaciones.get(key)
                if (puntuacion) {
                    carrera.push(puntuacion)
                }
            })
        })

        carrerasId.forEach(carrera => {
            var id = "";
            var value = 0;
            carrera.forEach(c => {
                id = c.id;
                if (c.value > value) {
                    value = c.value
                }
            })

            if (carrera.length > 0) {
                maximos.push({
                    id, value
                })
            }

        })


        return maximos;

    }


    static calculatePonderado(datos: Map<string, ResultadoInteractionSimple>) {

        var resultMax = new Map<string, number>();

        datos.forEach(({ resultados }) => {
            resultados.forEach(({ id, value }) => {
                var result = resultMax.get(id);

                if (result === undefined) {
                    resultMax.set(id, 0);
                    result = resultMax.get(id);
                }

                if (result !== undefined) {
                    const valueResult = result + value;
                    resultMax.set(id, valueResult)
                }
            })
        })

        var resultados: ResultadoPuntuacion[] = [];
        resultMax.forEach((value, key) => {
            resultados.push({ id: key, value })
        })

        return resultados
    }

    clearAll() {
        localStorage.clear();

        this.UIDUser = undefined;
        this.UIDTest = undefined;

        this.nav = { index: -1, finish: false, database: false }

        this.time = {
            inicial: -1,
            final: -1
        }

        this.userInformation = [];
        this.datos = new Map();

        this.resultados = [];
        this.maximos = [];
        this.porcentajes = [];
    }

    save() {
        const data = this.toJSON();
        localStorage.setItem(this.IDLocal, JSON.stringify(data))
    }

    toJSON() {

        const time = this.time;
        const nav = this.nav;
        const UIDUser = this.UIDUser;
        const UIDTest = this.UIDTest;

        const datos: { key: string, value: ResultadoInteraction }[] = []
        this.datos.forEach((value, key) => {
            datos.push({ value, key })
        })

        const userInformation = [...this.userInformation];
        const resultados = [...this.resultados];
        const maximos = [...this.maximos];
        const porcentajes = [...this.porcentajes];

        return {
            UIDTest,
            UIDUser,
            time,
            nav,
            userInformation,
            datos,
            resultados,
            maximos,
            porcentajes
        }
    }

    loadJSONData(data: IRegistroLoad) {

        console.log("INFO CARGADA LOAD DATA", data)

        this.UIDTest = data.UIDTest;
        this.UIDUser = data.UIDUser;
        this.nav = data.nav;
        this.time = data.time;

        this.userInformation = data.userInformation;
        this.resultados = data.resultados;
        this.maximos = data.maximos;
        this.porcentajes = data.porcentajes;

        this.datos = new Map();
        data.datos.forEach(({ value, key }, index) => {
            this.datos.set(key, value)
        })



    }

}

export default Registro;