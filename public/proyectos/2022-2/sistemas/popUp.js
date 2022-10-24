class PopUp {
  constructor(img, posX, posY, width, height, text) {
    this.img = img;
    this.posX = posX;
    this.posY = posY;
    this.text = text;
    this.width = width;
    this.height = height;
    this.on = false;
  }

  show() {
    image(this.img, this.posX, this.posY, this.img.widht, this.img.height);

    if (this.on) {
      stroke(217, 217, 217);
      strokeWeight(1);
      fill(255);
      rect(this.posX + 60, this.posY - 60, this.width, this.height, 12);
      noStroke();
      fill("#23A6F0");
      textSize(18);
      text(this.text, this.posX + 60 + 13, this.posY - 60 + 10, this.width);
    }
    // console.log("popUp esta mostrando");
  }
  action() {
    if (
      mouseX > this.posX &&
      mouseX < this.posX + this.img.width &&
      mouseY > this.posY &&
      mouseY < this.posY + this.img.height
    ) {
      this.on = !this.on;
      //  console.log("clickeó popUp");
    }
  }
}
