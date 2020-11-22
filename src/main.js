import Map from "./classes/Map.js";
import Camera from "./classes/Camera.js";
import { render } from "./renderer.js";

const
    camera = new Camera,
    map = new Map;

let time = 0;
loop();
function loop() {
    requestAnimationFrame(loop);
    render();
    time ++;
    
    map.render(time);
    camera.update();

}