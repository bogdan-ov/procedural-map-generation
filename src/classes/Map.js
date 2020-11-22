import { draw } from "../renderer.js";

class Map {
    constructor(seed) {

        this.seed = seed || Date.now();
        this.values = [];

        noise.seed(this.seed);

        for (var x = 0; x < 50; x++) {
            for (var y = 0; y < 50; y++) {

                this.values.push({
                    x, y,
                    height: noise.simplex2(x / 20, y / 20)
                });

            }
        }

        console.log(this.values);

    }

    render() {

        this.values.map(value=> {

            let 
                height = Math.abs(value.height * 50) + 1,
                color = "#000";

            // Water
            if (height < 15)
                color = "#1C3FFD"
            // Sand
            if (height > 15)
                color = "#D9AD77"
            // Ground
            if (height > 22)
                color = `hsl(141, 83%, ${ 35 - height / 2 + 15 }%)`;
            // Mountains
            if (height > 40)
                color = `hsl(0, 0%, ${ 19 - height / 2 + 15 }%)`;
            
            draw.rect(color, value.x * 50, value.y * 50, 50);

        })

    }

}
export default Map;