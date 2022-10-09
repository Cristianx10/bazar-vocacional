import DBRoutes from '../database/DBRoutes';
import Database from '../database/index';

class RealTime {

    inicializado = false;
    UIDActivity: string;
    UID:string;

    constructor(UID:string, UIDActivity: string) {
        this.UID = UID;
        this.UIDActivity = UIDActivity;
    }

    change(id: string, value: string | boolean | number) {
        //Arriba

        const DR = DBRoutes.REALTIME;
        const UID = this.UID;
        const UIDActivity = this.UIDActivity;

        const data = { id, value }

        Database.writeDatabase([
            DR._THIS,
            UID,
            DR.VAR,
            UIDActivity
        ], data)
    }

    listener(load: (data: { id: string, value: string }) => void) {
        if (this.inicializado === false) {
            this.inicializado = true;

            const DR = DBRoutes.REALTIME;
            const UID = this.UID;
            const UIDActivity = this.UIDActivity;

            Database.readBrachDatabase([
                DR._THIS,
                UID,
                DR.VAR,
                UIDActivity
            ], (sData) => {
                if (sData !== undefined && sData !== null) {
                    var data = sData.val()
                    if (data !== undefined && data !== null) {
                        const id = data.id;
                        const value = data.value
                    }
                }
            })
        }
    }

}

export default RealTime;