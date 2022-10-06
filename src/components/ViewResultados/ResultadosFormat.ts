import { ResultadoInteraction } from '../../constants/resultados/types';
import Usuario from '../../constants/firebase/user/Usuario';
import Excel from '../../constants/excel/index';
import { IUsuario } from '../../constants/firebase/user/Usuario';
import ListGeneral from '../../constants/simulations/ListGeneral';
import EstadosManagerAnalitics from '../../constants/estados/EstadosManagerAnalitics';

export interface UserResult {
    usuario: IUsuario;
    interacciones: ResultadoInteraction[];
}

export interface IResultadoInteracciones {
    UIDActivity: string;
    name: string;
    check: boolean;
    img: string;
    props: { key: string, value: string | number | boolean, check: boolean }[]
}

class ResultadosFormat {

    static getResultUsers(uids: IUsuario[]): UserResult[] {

        //Obtener interacciones de usuario

        return []
    }

    static generateExcel = (registros: UserResult[], config: IResultadoInteracciones[],
        types: {
            key: "GENERAL" | "ESPECIFICAS" | "PROPIEDADES";
            value: boolean;
        }[], typesConfig: {
            LAST: boolean;
            LASTTIME: boolean;
            TIME: "SEGUNDOS" | "MINUTOS" | "MILISEGUNDOS";
        }) => {


        const excel = new Excel();


        var titularesGeneralMap = new Map<string, string>();
        var matrixGeneral: (string | number)[][] = []


        var titularesEspecificasMap = new Map<string, string>();
        var matrixEspecifica: (string | number)[][] = []


        var titularesMapPropsMap = new Map<string, string>();
        var matrixPropiedades: (string | number | boolean)[][] = []

        var typesDescarga = {
            GENERAL: false,
            ESPECIFICAS: false,
            PROPIEDADES: false
        }

        types.forEach((type) => {
            if (type.key === "GENERAL") {
                typesDescarga.GENERAL = type.value
            }

            if (type.key === "ESPECIFICAS") {
                typesDescarga.ESPECIFICAS = type.value
            }

            if (type.key === "PROPIEDADES") {
                typesDescarga.PROPIEDADES = type.value
            }
        })



        var configMap = new Map<string, IResultadoInteracciones>()
        config.forEach(con => {
            configMap.set(con.UIDActivity, con)
        })

        titularesGeneralMap.set("#NOMBRE", "#NOMBRE");
        titularesEspecificasMap.set("#NOMBRE", "#NOMBRE");
        titularesMapPropsMap.set("#NOMBRE", "#NOMBRE");

        registros.forEach(registro => {

            var dataUserFile = new Map<string, string | number>();
            var dataInteractionFile = new Map<string, string>();

            registro.usuario.informacion.forEach(({ id, value }) => {
                titularesGeneralMap.set(id, id)
                titularesEspecificasMap.set(id, id);
                titularesMapPropsMap.set(id, id);
                dataUserFile.set(id, value);
            })

            titularesEspecificasMap.set("#INDEX", "#INDEX");
            titularesMapPropsMap.set("#INDEX", "#INDEX");

            titularesEspecificasMap.set("#INTERACCION", "#INTERACCION");
            titularesMapPropsMap.set("#INTERACCION", "#INTERACCION");

            //Datos pruebas general
            var datosDePruebasGeneral: Map<string, number>[] = [];

            //Datos pruebas especificas
            var datosDePruebasEspecificas: Map<string, number | string>[] = [];

            //Datos pruebas con propiedades
            var datosDePruebasProps: {
                titulares: string[];
                values: (string | number | boolean)[][];
                resultados: Map<string, number | string>,
                nameUIDInteraction: string,
            }[] = [];


            var resultadosMap = new Map<string, number>()

            registro.usuario.resultados.result.global.forEach(({ id, value }) => {
                titularesGeneralMap.set(id, id)
                resultadosMap.set(id, value)
            })

            datosDePruebasGeneral.push(resultadosMap);


            registro.interacciones.forEach((dato, j) => {

                const { data, UIDActivity, resultados } = dato;
                const estadosData = data;
                const filter = configMap.get(UIDActivity);

                if (filter !== undefined) {

                    const interactionName = dataInteractionFile.get(UIDActivity)
                    if (interactionName === undefined) {
                        const interaction = ListGeneral.get(UIDActivity);
                        if (interaction) {
                            dataInteractionFile.set(UIDActivity, interaction.title)
                        }
                    }

                    var resultMap = new Map<string, number | string>()

                    resultados.forEach(({ id, value }) => {
                        titularesEspecificasMap.set(id, id);
                        titularesMapPropsMap.set(id, id);
                        resultMap.set(id, value)
                    })

                    resultMap.set("#INDEX", j + 1)
                    const nameInteraction = dataInteractionFile.get(UIDActivity);
                    if (nameInteraction) {
                        resultMap.set("#INTERACCION", nameInteraction)
                    } else {
                        resultMap.set("#INTERACCION", UIDActivity)
                    }


                    datosDePruebasEspecificas.push(resultMap)


                    var filterString = [] as string[];
                    filter.props.forEach(prop => { if (prop.check === true) { filterString.push(prop.key) } })
                    const dataMap = EstadosManagerAnalitics.getArrayMap(dato.data, {
                        filter: filterString,
                        lastState: typesConfig.LAST,
                        time: typesConfig.TIME,
                        lastTime: typesConfig.LASTTIME
                    })
                    datosDePruebasProps.push({ ...dataMap, resultados: resultMap, nameUIDInteraction: UIDActivity })

                    dataMap.titulares.forEach((titular) => {
                        titularesMapPropsMap.set(titular, titular);
                    })
                }

            })


            //Exportando filas general

            var matrixExcelGeneral: (string | number)[][] = []

            datosDePruebasGeneral.forEach((datosDePruebas, i) => {

                var fila: (string | number)[] = []

                titularesGeneralMap.forEach(titular => {

                    const dataUser = dataUserFile.get(titular);

                    const resultado = datosDePruebas.get(titular)

                    if (dataUser !== undefined) {
                        fila.push(dataUser);
                    } else if (resultado !== undefined) {
                        fila.push(resultado);
                    } else if (titular === "#NOMBRE") {
                        fila.push(registro.usuario.nombre);
                    } else {
                        fila.push("");
                    }


                })
                matrixExcelGeneral.push(fila)

            })

            //Exportando filas especificas
            var matrixExcelEspecificas: (string | number)[][] = []

            datosDePruebasEspecificas.forEach(resultadoMap => {

                var fila: (string | number)[] = []

                titularesEspecificasMap.forEach(titular => {

                    const dataUser = dataUserFile.get(titular);
                    const resultado = resultadoMap.get(titular)

                    if (dataUser !== undefined) {
                        fila.push(dataUser);
                    } else if (resultado !== undefined) {
                        fila.push(resultado);
                    } else if (titular === "#NOMBRE") {
                        fila.push(registro.usuario.nombre);
                    } else {
                        fila.push("");
                    }
                })

                matrixExcelEspecificas.push(fila)
            })


            //Exportando filas propiedades
            var matrixExcelPropiedades: (string | number | boolean)[][] = []

            datosDePruebasProps.forEach(dato => {

                var titularMap = new Map<string, number>()
                dato.titulares.forEach((t, j) => {
                    titularMap.set(t, j);
                })

                dato.values.forEach(values => {

                    var fila: (string | number | boolean)[] = []

                    titularesMapPropsMap.forEach(titular => {
                        var encontrado = false;
                        const dataUser = dataUserFile.get(titular);
                        const resultado = dato.resultados.get(titular)


                        if (dataUser !== undefined) {
                            encontrado = true;
                            fila.push(dataUser);
                        } else if (resultado !== undefined) {
                            encontrado = true;
                            fila.push(resultado);
                        } else if (titular === "#NOMBRE") {
                            fila.push(registro.usuario.nombre);
                        }

                        if (encontrado === false) {

                            const j = titularMap.get(titular);

                            if (j !== undefined) {
                                const value = values[j];
                                fila.push(value)
                            } else {
                                fila.push("")
                            }

                        }
                    })

                    matrixExcelPropiedades.push(fila)

                })

            })

            matrixGeneral = [...matrixGeneral, ...matrixExcelGeneral]
            matrixEspecifica = [...matrixEspecifica, ...matrixExcelEspecificas]
            matrixPropiedades = [...matrixPropiedades, ...matrixExcelPropiedades]

        })

        const { GENERAL, ESPECIFICAS, PROPIEDADES } = typesDescarga;

        if (GENERAL === true) {
            var titularesGeneral: string[] = []
            titularesGeneralMap.forEach(t => { titularesGeneral.push(t) })

            matrixGeneral = [titularesGeneral, ...matrixGeneral]
            excel.crearHoja("GENERAL");
            excel.cargarMatrix("GENERAL", matrixGeneral);
        }

        if (ESPECIFICAS === true) {
            var titularesEspecifico: string[] = []
            titularesEspecificasMap.forEach(t => { titularesEspecifico.push(t) })

            matrixEspecifica = [titularesEspecifico, ...matrixEspecifica]
            excel.crearHoja("ESPECIFICO");
            excel.cargarMatrix("ESPECIFICO", matrixEspecifica)
        }

        if (PROPIEDADES === true) {
            var titularesPropiedades: string[] = []
            titularesMapPropsMap.forEach(t => { titularesPropiedades.push(t) })

            matrixPropiedades = [titularesPropiedades, ...matrixPropiedades]
            excel.crearHoja("PROPIEDADES");
            excel.cargarMatrix("PROPIEDADES", matrixPropiedades)
        }


        excel.guardar("Test Vocacional.xlsx");

    }

}

export default ResultadosFormat;