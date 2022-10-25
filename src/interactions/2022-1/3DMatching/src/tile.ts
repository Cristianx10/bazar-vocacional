import p5 from "p5";
import Logica from "./logica";
//Objeto carta que recibe una posicion x,y y una imagen de como se vera la carta arriba------------
class Tile {

  app: p5;
  log: Logica;
  x: number;
  y: number;
  width: number;
  height: number;
  selectedimg: p5.Image;
  matchedimg: p5.Image;
  img: p5.Image;
  isSelected: boolean;
  isMatched: boolean;
  pair: number;
  id: number;


  constructor(log: Logica, x: number, y: number, img: p5.Image, pair: number, id: number) {
    this.log = log;
    this.app = log.app;
    this.x = x;
    this.y = y;
    this.width = this.app.width;
    this.height = this.app.height;
    this.selectedimg = log.selectedimg;
    this.matchedimg = log.matchedimg;
    this.img = img;
    this.isSelected = false;
    this.isMatched = false;
    this.pair = pair;
    this.id = id;
  }

  render(ratio: number, ratio2: number) {

    this.width = 696.22 * ratio;
    this.height = 843.54 * ratio;

    this.app.imageMode(this.app.CENTER)
    this.app.image(this.img, this.x, this.y, this.width, this.height)

    if (this.isSelected) {
      this.app.image(this.selectedimg, this.x - 5, this.y - 3, this.width * ratio2, this.height * ratio2)
    }
    if (this.isMatched) {
      this.app.image(this.matchedimg, this.x, this.y, this.width, this.height)
    }

    
    this.app.imageMode(this.app.CORNER)
  }

  setIsSelected(isSelected: boolean) {
    this.isSelected = isSelected
  }

  getIsSelected() {
    return this.isSelected
  }

  setIsMatched(isMatched: boolean) {
    // this.setIsSelected(false)
    this.isMatched = isMatched
  }

  getIsMatched() {
    return this.isMatched
  }

  getPair() {
    return this.pair;
  }

  getPosX() {
    return this.x;
  }

  getPosY() {
    return this.y;
  }

  getId() {
    return this.id;
  }
}


export default Tile;