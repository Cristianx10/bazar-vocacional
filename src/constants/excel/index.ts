import XLSX from "xlsx";
import { Descargar } from '../helpers/index';


class Excel { 

    excel: XLSX.WorkBook;

    constructor() { 
        this.excel = XLSX.utils.book_new();
    }

    autor(titulo: string, sujeto: string, autor: string, fecha: Date) {
        this.excel.Props = {
            Title: titulo,
            Subject: sujeto,
            Author: autor,
            CreatedDate: fecha
        }; 
    }

    crearHoja(nombre: string) { 
        this.excel.SheetNames.push(nombre);
    }

    cargarMatrix(nombre: string, valores: Array<any>) {
        var ws = XLSX.utils.aoa_to_sheet(valores);
        this.excel.Sheets[nombre] = ws;
    }

    guardar(titulo: string) {
        var wbout = XLSX.write(this.excel, { bookType: 'xlsx', type: 'binary' });
        var buf = new ArrayBuffer(wbout.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xFF;

        //Guardar Archivo
        Descargar(titulo + ".xlsx", buf, "application/octet-stream");
    }
}


export default Excel;