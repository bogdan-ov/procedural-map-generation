import { ctx } from "../renderer.js";

class Camera {
    constructor() {

        this.x =
        this.y = 0;

    }

    update({ x, y }) {

        ctx.translate(x, y);

    }
}
export default Camera;