import DBRoutes from '../../constants/firebase/database/DBRoutes';
import Database from '../../constants/firebase/database/index';
import { UserResult } from '../../components/ViewResultados/ResultadosFormat';
import { ResultadoInteraction } from '../../constants/resultados/types';
import { IUsuario } from '../../constants/firebase/user/Usuario';
export const getAllUserPruebas = (load: (registros: (UserResult & { check: boolean })[]) => void) => {

    //Buscando a los resultados de los usuarios
    const RR = DBRoutes.RESULTADOS;
    const RU = DBRoutes.USER;

    var counter = 0;

    Database.readBrachOnlyDatabaseVal([RR._THIS, RR.DATA], (sPersonasPruebas) => {

        var personasPruebas = Object.entries<any>(sPersonasPruebas);

        var tests: (UserResult & { check: boolean })[] = [];

        var resultados: (UserResult & { check: boolean })[] = [];

        personasPruebas.forEach((personasPrueba) => {

            const [uidPersona, pruebasData] = personasPrueba;

            var interacciones = Object.values<ResultadoInteraction>(pruebasData);

            Database.readBrachOnlyDatabaseVal([
                RU._THIS,
                RU.INFORMATION,
                uidPersona,
                RU.INFORMATION], (sUser: IUsuario) => {

                    var usuario = sUser;

                    const resultado = {
                        usuario,
                        interacciones,
                        check: false
                    }

                    resultados.push(resultado)
                    counter++;

                    if (counter < personasPruebas.length) {

                        //Obtenidas toda la informacion necesaria
                        load(resultados)
                     
                    }
                })


        })

    });
}