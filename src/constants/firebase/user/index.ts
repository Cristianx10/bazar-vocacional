import DBRoutes from '../database/DBRoutes';
import Database from '../database/index';
import { 
    Auth, 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,  
    User, UserCredential } from "firebase/auth";

export interface IUserInformation {
    UID: string;
    nombre: string; 
    correo: string;
    role: "LOCAL" | "ADMINISTRADOR" | "EDITOR" | "VISOR" | "";
}

class userConfig {

    userFirebase?: User;
    auth: Auth;
    information: IUserInformation;


    constructor() {
        this.auth = getAuth();
        this.information = this.getDefaultInformation();
        this.getUserChangeLocal();
    }

    login(correo: string, pass: string, load?: (login: boolean) => void) {
        signInWithEmailAndPassword(this.auth, correo, pass).then(() => {
            load && load(true);
        }).catch(() => {
            load && load(false);
        });

    }

    register(correo: string, pass: string, information: { name: string }, load?: (register: boolean) => void) {

        const RU = DBRoutes.USER;

        createUserWithEmailAndPassword(this.auth, correo, pass).then((userFirebase: UserCredential) => {
            if (userFirebase.user) {
                this.userFirebase = userFirebase.user;
                let UID = this.userFirebase.uid;
                let user = {
                    UID,
                    nombre: information.name,
                    correo,
                    role: "LOCAL"
                } as IUserInformation;


                Database.writeDatabase([RU._THIS, RU.INFORMATION, UID, RU.INFORMATION], user, () => {
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
                        this.userFirebase.uid,
                        RU.INFORMATION], (snap) => {
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

    private getDefaultInformation(): IUserInformation {
        return {
            UID: "",
            nombre: "",
            correo: "",
            role: ""
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
        this.information = this.getDefaultInformation();
    }

    setInformation(information: IUserInformation) {
        this.information = information;
    }

    getUID() {
        var uid = "";
        if (this.userFirebase) {
            uid = this.userFirebase.uid;
        }
        return uid;
    }

}

var User = new userConfig();

export default User;