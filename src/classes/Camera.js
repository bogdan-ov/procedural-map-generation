import config from "../config.js";
import Keyboard from "../general/Keyboard.js";
import { camera, draw } from "../renderer.js";

class Camera {
    constructor() {
        
        this.speed = config.camera.speed;

    }

    update() {
        
        this.move();
        draw.rect("#f00", camera.x, camera.y, 4, 4);

    }
    move() {

        camera.x += (+(Keyboard.keyDown("D")) - +(Keyboard.keyDown("A"))) * this.speed;
        camera.y += (+(Keyboard.keyDown("S")) - +(Keyboard.keyDown("W"))) * this.speed;

    }
}
export default Camera;