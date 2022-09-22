export const JoinStyles = (nameSytles: string[], divide = " ") => {
    let className = "";

    nameSytles.forEach((s, i) => {
        let space = divide;
        if (i === 0) {
            space = "";
        }
        if (s !== "" && s !== undefined && s !== null) {
            className = className + space + s;
        }
    });

    return className
}

export const Descargar = (name: string, data: string | ArrayBuffer, type = 'text/plain') => {
    var nombre = name;
    var text = data;
    var blob = new Blob([text], { type });
    var anchor = document.createElement('a');

    anchor.download = nombre;
    anchor.href = (/*window.webkitURL ||*/ window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = [type, anchor.download, anchor.href].join(':');
    anchor.click();
}