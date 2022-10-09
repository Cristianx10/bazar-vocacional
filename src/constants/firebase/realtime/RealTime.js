"use strict";
exports.__esModule = true;
var DBRoutes_1 = require("../database/DBRoutes");
var index_1 = require("../database/index");
var RealTime = /** @class */ (function () {
    function RealTime(UID, UIDActivity) {
        this.inicializado = false;
        this.UID = UID;
        this.UIDActivity = UIDActivity;
    }
    RealTime.prototype.change = function (id, value) {
        //Arriba
        var DR = DBRoutes_1["default"].REALTIME;
        var UID = this.UID;
        var UIDActivity = this.UIDActivity;
        var data = { id: id, value: value };
        index_1["default"].writeDatabase([
            DR._THIS,
            UID,
            DR.VAR,
            UIDActivity
        ], data);
    };
    RealTime.prototype.listener = function (load) {
        if (this.inicializado === false) {
            this.inicializado = true;
            var DR = DBRoutes_1["default"].REALTIME;
            var UID = this.UID;
            var UIDActivity = this.UIDActivity;
            index_1["default"].readBrachDatabase([
                DR._THIS,
                UID,
                DR.VAR,
                UIDActivity
            ], function (sData) {
                if (sData !== undefined && sData !== null) {
                    var data = sData.val();
                    if (data !== undefined && data !== null) {
                        var id = data.id;
                        var value = data.value;
                    }
                }
            });
        }
    };
    return RealTime;
}());
exports["default"] = RealTime;
