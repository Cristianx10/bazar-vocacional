
import { getStorage, UploadTaskSnapshot, ref, getDownloadURL, uploadBytes, UploadResult } from "firebase/storage";

class SetupStorage {

    storage = getStorage();

    readURL(urls: string[], load: (url: string) => void) {
        var { isNull, url } = this.getRoutes(urls);
        if (!isNull) {

            var dirreccion = getDownloadURL(this.getRef(url))
            dirreccion.then((dir: any) => {

                load && load(dir);

            })
        }
    }

    subir(urls: string[], file: File | Blob, name: string, load?: (a: UploadResult) => void) {

        var { isNull, url } = this.getRoutes(urls);
        if (!isNull) {
            var referencia = this.getRef(url)
            var referenceStorage = ref(referencia, name)

            uploadBytes(referenceStorage, file).then((a) => { load && load(a) });
        }

    }

    getRef(url: string) {
        return ref(this.storage, url);
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

var Storage = new SetupStorage();

export default Storage;

export const RStorage = {
    imagenes: "app/comentarios/resources/img"
}