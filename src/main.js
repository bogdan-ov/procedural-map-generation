// import Camera from "./classes/Camera.js";
import Map from "./classes/Map.js";
import Player from "./classes/Player.js";
import { camera, render } from "./renderer.js";

const
    player = new Player,
    map = new Map;
    // camera = new Camera;

loop();
function loop() {
    requestAnimationFrame(loop);
    render();
    
    map.render();
    player.update();
    camera.x = player.x;
    camera.y = player.y;
    // camera.update(player);

}