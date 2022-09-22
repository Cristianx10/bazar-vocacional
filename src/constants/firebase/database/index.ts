
import Firebase from '../setup/index';

import { DataSnapshot, getDatabase, ref, onValue, off, set, push } from "firebase/database";
import FirebaseInit from '../setup/index';

class SetupDatabase {

    db;

    constructor() {
        FirebaseInit();
        this.db = getDatabase();
    }

    evalueteRouteExist(urls: string[], load: (exist: boolean, snapshot: DataSnapshot | undefined) => void) {
        var { isNull, url } = this.getRoutes(urls);

        if (!isNull) {
            var referencia = ref(this.db, url);
            onValue(referencia, (snapshot: DataSnapshot) => {
                var value = undefined;
                var exist = false;
                if (snapshot.exists()) {
                    value = snapshot;
                    exist = true;
                }
                load(exist, value);
            });
        } else {
            load(false, undefined);
        }
    }

    evalueteRouteExistMin(urls: string[], val: string, load: (exist: boolean, snapshot: DataSnapshot | undefined) => void) {
        var { isNull, url } = this.getRoutes(urls);

        if (!isNull) {
            var referencia = ref(this.db, url);
            onValue(referencia, (snapshot: DataSnapshot) => {
                var value = undefined;
                var exist = false;
                var key = snapshot.key || "";

                if (snapshot.exists()) {

                    if (key === "") {
                        value = snapshot;
                        exist = true;
                    } else if (key !== "") {
                        if (key.toLowerCase() === val.toLowerCase()) {
                            value = snapshot;
                            exist = true;
                        }
                    }
                } else {

                }
                load(exist, value);
            });
        } else {
            load(false, undefined);
        }
    }

    readBrachOnlyDatabaseVal(urls: string[], load: (snapshot: any) => void) {
        this.readBrachOnlyDatabase(urls, (snap) => {
            if (snap !== null && snap !== undefined) {
                const snapVal = snap.val()
                if (snapVal !== undefined && snapVal !== null) {
                    load(snapVal)
                }
            }
        })
    }

    readBrachOnlyDatabase(urls: string[], load: (snapshot: DataSnapshot | undefined) => void) {

        var { isNull, url } = this.getRoutes(urls);

        if (!isNull) {
            var refDataBase = ref(this.db, url);
            onValue(refDataBase, (snapshots: DataSnapshot) => {
                off(refDataBase);
                load(snapshots);
            });
        } else {
            load(undefined);
        }
    }

    readBrachDatabase(urls: string[], load: (snapshot: DataSnapshot | undefined) => void) {

        var { isNull, url } = this.getRoutes(urls);
        let listener = () => { };
        if (!isNull) {
            var refDataBase = ref(this.db, url);
            let listenRealTime = onValue(refDataBase, (snapshots: any) => {
                load(snapshots);
            });

            listener = () => {
                off(refDataBase, undefined, listenRealTime)
            }


        } else {
            load(undefined);
        }

        return listener;
    }





    writeDatabase(urls: string[], objeto: any, load?: (snapshot: DataSnapshot | undefined) => void) {

        var { isNull, url } = this.getRoutes(urls);

        if (!isNull) {
            var referencia = ref(this.db, url);
            set(referencia, objeto).then(() => {
                load && load(objeto);
            });
        } else {
            load && load(undefined);
        }
    }


    generateUID(urls: string[]) {
        var { isNull, url } = this.getRoutes(urls);
        var referencia = ref(this.db, url)
        return push(referencia).key || "";
    }

    writeDatabasePush(urls: string[], objeto: any, load?: (snapshot: DataSnapshot | undefined, UID: string) => void) {

        var { isNull, url } = this.getRoutes(urls);

        if (!isNull) {
            var referencia = ref(this.db, url)
            let UID = push(referencia).key || "";
            objeto.UID = UID;
            var resultObject = JSON.parse(JSON.stringify(objeto));

            this.writeDatabase([url, UID], resultObject, (snapshot) => {
                load && load(snapshot, UID);
            });

        } else {
            load && load(undefined, "");
        }
    }

    writeDatabasePushWithOutUID(urls: string[], objeto: any, load?: (snapshot: DataSnapshot | undefined, UID: string) => void) {

        var { isNull, url } = this.getRoutes(urls);

        if (!isNull) {

            var referencia = ref(this.db, url)
            let UID = push(referencia).key || "";
            var resultObject = JSON.parse(JSON.stringify(objeto));

            if (UID !== "") {
                this.writeDatabase([url, UID], resultObject, (snapshot) => {
                    load && load(snapshot, UID);
                });
            }
        } else {
            load && load(undefined, "");
        }
    }

    getRoutes(urls: string[]) {
        var url = "";
        var isNull = false;
        for (let i = 0; i < urls.length; i++) {
            let u = urls[i];
            if (u !== "" && u !== undefined && u !== null) {
                if (i === 0) {
                    url = u;
                } else {
                    url = url + "/" + u;
                }
            } else {
                isNull = true;
                console.error("No existe un valor", urls);
                i = urls.length;
            }
        }
        return { url, isNull };
    }
}


var Database = new SetupDatabase();

export default Database;

