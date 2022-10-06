import DBRoutes from '../database/DBRoutes';
import Database from '../database/index';
import FirebaseInit from '../setup/index';
import Usuario from './Usuario';
import { IUsuario } from './Usuario';
import {
    Auth,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    User, UserCredential
} from "firebase/auth";

export const DEFAULT_PASS = "1234567890";

class userConfig {

    userFirebase?: User;
    auth: Auth;
    usuario?: Usuario;


    constructor() {
        FirebaseInit();
        this.auth = getAuth();
        this.usuario = undefined;
        this.getUserChangeLocal();
    }

    login(correo: string, pass: string, load?: (login: boolean, error: string) => void) {
        signInWithEmailAndPassword(this.auth, correo, pass).then(() => {
            this.getUserChangeLocal(()=>{
                load && load(true, "");
            })
       
        }).catch((err) => {
            load && load(false, err);
        });

    }

    register(correo: string, pass: string, information: { name: string, identificacion: string, genero: string, prueba: string }, load?: (register: boolean) => void) {

        const RU = DBRoutes.USER;

        createUserWithEmailAndPassword(this.auth, correo, pass).then((userFirebase: UserCredential) => {
            if (userFirebase.user) {
                this.userFirebase = userFirebase.user;
                let UID = this.userFirebase.uid;
                let user = {
                    UID,
                    nombre: information.name,
                    identificacion: information.identificacion,
                    prueba: information.prueba,
                    genero: information.genero,
                    correo,
                    role: "LOCAL"
                } as IUsuario;


                Database.writeDatabase([RU._THIS, RU.INFORMATION, UID], user, () => {
                    this.setInformation(user);
                    load && load(true);
                });
            }

        }).catch(() => {
            load && load(false);
        });

    }

    getUserChangeLocal(load?: (login: boolean) => void) {

        const RU = DBRoutes.USER;
        if (this.userFirebase === null || this.userFirebase === undefined) {
            this.auth.onAuthStateChanged((user: User | null) => {
                if (user) {
                    // User is signed in.
                    this.userFirebase = user;

                    Database.readBrachOnlyDatabase([
                        RU._THIS,
                        RU.INFORMATION,
                        this.userFirebase.uid
                        ], (snap) => {
                            if (snap) {
                                var information = snap.val();
                                // console.log("Mi informacion", information)
                                this.setInformation(information);
                                load && load(true);
                            } else {
                                load && load(false);
                            }
                        })

                } else {
                    // No user is signed in.
                    load && load(false);
                }
            });
        } else {
            load && load(false);
        }
    }



    loginOut(load: (exit: boolean) => void) {
        this.auth.signOut().then(() => {
            this.resetUser();
            load(true);
        }).catch(function () {
            load(false)
        });
    }

    resetUser() {
        this.userFirebase = undefined;
        this.usuario = undefined;
    }

    setInformation(information: IUsuario) {
        this.usuario = new Usuario(information);
    }

    getUID() {
        var uid = "";
        if (this.userFirebase) {
            uid = this.userFirebase.uid;
        }
        return uid;
    }

}

var UserFirebase = new userConfig();

export default UserFirebase;