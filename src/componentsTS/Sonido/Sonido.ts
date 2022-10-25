class Sonido {


    url: string;
    isPlaying: boolean;
    sonido: HTMLAudioElement;

    lowSound?: NodeJS.Timeout;

    constructor(url: string) {
        this.url = url;
        this.isPlaying = false;
        this.sonido = document.createElement("audio");
        var source = document.createElement("source");
        source.src = url;
        this.sonido.appendChild(source);
    }

    play() {

        if (this.isPlaying === false) {
            this.isPlaying = true;
            this.sonido.play()
        } else {
            if (this.lowSound) {
                clearInterval(this.lowSound);
            }
            this.stopAbsoluto();
            this.isPlaying = true;
            this.sonido.play()
        }
    }

    stopAbsoluto(){
        this.isPlaying = false;
        this.sonido.pause();
        this.sonido.currentTime = 0;
    }

    stop() {

        if (this.isPlaying == true) {

            this.lowSound = setInterval(() => {
                var nSonido = this.sonido.volume;
                nSonido -= 0.1;

                if (nSonido >= 0) {
                    this.sonido.volume = nSonido;
                }

                if (nSonido < 0) {
                    if (this.lowSound) {
                        clearInterval(this.lowSound);
                    }
                    this.sonido.volume = 1;

                    this.stopAbsoluto();
                }
            }, 25);

        }

    }

    pause() {
        this.isPlaying = false;
        this.sonido.pause();
    }

    reset() {
        this.sonido.currentTime = 0;
    }

    getIsPlaying() {
        return this.isPlaying;
    }

}

export default Sonido;