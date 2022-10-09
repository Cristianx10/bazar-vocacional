"use strict";
exports.__esModule = true;
var database_1 = require("firebase/database");
var index_1 = require("../setup/index");
var SetupDatabase = /** @class */ (function () {
    function SetupDatabase() {
        (0, index_1["default"])();
        this.db = (0, database_1.getDatabase)();
    }
    SetupDatabase.prototype.evalueteRouteExist = function (urls, load) {
        var _a = this.getRoutes(urls), isNull = _a.isNull, url = _a.url;
        if (!isNull) {
            var referencia = (0, database_1.ref)(this.db, url);
            (0, database_1.onValue)(referencia, function (snapshot) {
                var value = undefined;
                var exist = false;
                if (snapshot.exists()) {
                    value = snapshot;
                    exist = true;
                }
                load(exist, value);
            });
        }
        else {
            load(false, undefined);
        }
    };
    SetupDatabase.prototype.evalueteRouteExistMin = function (urls, val, load) {
        var _a = this.getRoutes(urls), isNull = _a.isNull, url = _a.url;
        if (!isNull) {
            var referencia = (0, database_1.ref)(this.db, url);
            (0, database_1.onValue)(referencia, function (snapshot) {
                var value = undefined;
                var exist = false;
                var key = snapshot.key || "";
                if (snapshot.exists()) {
                    if (key === "") {
                        value = snapshot;
                        exist = true;
                    }
                    else if (key !== "") {
                        if (key.toLowerCase() === val.toLowerCase()) {
                            value = snapshot;
                            exist = true;
                        }
                    }
                }
                else {
                }
                load(exist, value);
            });
        }
        else {
            load(false, undefined);
        }
    };
    SetupDatabase.prototype.readBrachOnlyDatabaseVal = function (urls, load) {
        this.readBrachOnlyDatabase(urls, function (snap) {
            if (snap !== null && snap !== undefined) {
                var snapVal = snap.val();
                if (snapVal !== undefined && snapVal !== null) {
                    load(snapVal);
                }
            }
        });
    };
    SetupDatabase.prototype.readBrachOnlyDatabase = function (urls, load) {
        var _a = this.getRoutes(urls), isNull = _a.isNull, url = _a.url;
        if (!isNull) {
            var refDataBase = (0, database_1.ref)(this.db, url);
            (0, database_1.onValue)(refDataBase, function (snapshots) {
                (0, database_1.off)(refDataBase);
                load(snapshots);
            });
        }
        else {
            load(undefined);
        }
    };
    SetupDatabase.prototype.readBrachDatabase = function (urls, load) {
        var _a = this.getRoutes(urls), isNull = _a.isNull, url = _a.url;
        var listener = function () { };
        if (!isNull) {
            var refDataBase = (0, database_1.ref)(this.db, url);
            var listenRealTime_1 = (0, database_1.onValue)(refDataBase, function (snapshots) {
                load(snapshots);
            });
            listener = function () {
                (0, database_1.off)(refDataBase, undefined, listenRealTime_1);
            };
        }
        else {
            load(undefined);
        }
        return listener;
    };
    SetupDatabase.prototype.writeDatabase = function (urls, objeto, load) {
        var _a = this.getRoutes(urls), isNull = _a.isNull, url = _a.url;
        if (!isNull) {
            var referencia = (0, database_1.ref)(this.db, url);
            (0, database_1.set)(referencia, objeto).then(function () {
                load && load(objeto);
            });
        }
        else {
            load && load(undefined);
        }
    };
    SetupDatabase.prototype.generateUID = function (urls) {
        var _a = this.getRoutes(urls), isNull = _a.isNull, url = _a.url;
        var referencia = (0, database_1.ref)(this.db, url);
        return (0, database_1.push)(referencia).key || "";
    };
    SetupDatabase.prototype.writeDatabasePush = function (urls, objeto, load) {
        var _a = this.getRoutes(urls), isNull = _a.isNull, url = _a.url;
        if (!isNull) {
            var referencia = (0, database_1.ref)(this.db, url);
            var UID_1 = (0, database_1.push)(referencia).key || "";
            objeto.UID = UID_1;
            var resultObject = JSON.parse(JSON.stringify(objeto));
            this.writeDatabase([url, UID_1], resultObject, function (snapshot) {
                load && load(snapshot, UID_1);
            });
        }
        else {
            load && load(undefined, "");
        }
    };
    SetupDatabase.prototype.writeDatabasePushWithOutUID = function (urls, objeto, load) {
        var _a = this.getRoutes(urls), isNull = _a.isNull, url = _a.url;
        if (!isNull) {
            var referencia = (0, database_1.ref)(this.db, url);
            var UID_2 = (0, database_1.push)(referencia).key || "";
            var resultObject = JSON.parse(JSON.stringify(objeto));
            if (UID_2 !== "") {
                this.writeDatabase([url, UID_2], resultObject, function (snapshot) {
                    load && load(snapshot, UID_2);
                });
            }
        }
        else {
            load && load(undefined, "");
        }
    };
    SetupDatabase.prototype.getRoutes = function (urls) {
        var url = "";
        var isNull = false;
        for (var i = 0; i < urls.length; i++) {
            var u = urls[i];
            if (u !== "" && u !== undefined && u !== null) {
                if (i === 0) {
                    url = u;
                }
                else {
                    url = url + "/" + u;
                }
            }
            else {
                isNull = true;
                console.error("No existe un valor", urls);
                i = urls.length;
            }
        }
        return { url: url, isNull: isNull };
    };
    return SetupDatabase;
}());
var Database = new SetupDatabase();
exports["default"] = Database;
