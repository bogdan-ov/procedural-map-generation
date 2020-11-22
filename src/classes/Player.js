import Keyboard from "../general/Keyboard.js";
import { draw } from "../renderer.js";

class Player {
    constructor() {

        this.x =
        this.y = 100;
        this.size = 50;
        
        this.speed = 4;

    }

    update() {
        this.move();
        // this.draw();
    }
    move() {

        this.x += (+(Keyboard.keyDown("D")) - +(Keyboard.keyDown("A"))) * this.speed;
        this.y += (+(Keyboard.keyDown("S")) - +(Keyboard.keyDown("W"))) * this.speed;

    }
    draw() {

        draw.rect("#f00", this.x, this.y, this.size);

    }
}
export default Player;