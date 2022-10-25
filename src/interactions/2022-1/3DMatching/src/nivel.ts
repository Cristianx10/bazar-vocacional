import p5 from "p5"
import Tile from "./tile";

class Nivel {
    cardDeck: Tile[];
    img: p5.Image;
    constructor(cardDeck: Tile[], img: p5.Image) {
        this.cardDeck = cardDeck;
        this.img = img;
    }

}

export default Nivel;