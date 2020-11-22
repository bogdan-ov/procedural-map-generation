import config from "../config.js";
import { camera, draw } from "../renderer.js";

class Map {
    constructor(seed) {

        this.seed = seed || Date.now();
        noise.seed(this.seed);
        this.spawn_point = {
            x: 0,
            y: 0,
            in: null,
            old: {
                x: 0,
                y: 0
            }
        };

        this.chunks = [
            new Chunk(this, 0, 0),
            new Chunk(this, 1, 0),
            new Chunk(this, 0, 1),
            new Chunk(this, 1, 1),
            new Chunk(this, 2, 0),
            new Chunk(this, 0, 2),
            new Chunk(this, 2, 2),
            new Chunk(this, 2, 1),
            new Chunk(this, 1, 2),
            new Chunk(this, 3, 0),
            new Chunk(this, 3, 1),
            new Chunk(this, 3, 2),
        ];
        this.created_chunk = false;

    }

    render(time) {

        const size = config.chunk.size * config.chunk.tile_size;

        this.spawn_point.x = Math.round(camera.x / size + .5) * size - size;
        this.spawn_point.y = Math.round(camera.y / size + .5) * size - size;

        this.chunks.map(chunk=> {
            
            // if (
            //     (Math.floor(chunk.x) == Math.floor(this.spawn_point.x / size) &&
            //     Math.floor(chunk.y) == Math.floor(this.spawn_point.y / size))
            // ) {
    
            //     this.spawn_point.in = chunk;
            //     // console.log(true);
            //     // this.chunks.push(new Chunk(this, this.spawn_point.x / size, this.spawn_point.y / size))

            // // }
            // } else this.spawn_point.in = null;
            
            chunk.render(time);

        });

        // console.log(this.spawn_point.in ? this.spawn_point.in : "");
        // draw.rect(this.spawn_point.in ? "rgba(255, 0, 0, .5)" : "rgba(0, 255, 0, .5)", this.spawn_point.x + size / 2 - 25, this.spawn_point.y + size / 2 - 25, size);

    }

}

class Chunk {
    constructor(map, x, y) {

        this.x = x || 0;
        this.y = y || 0;
        this.size = config.chunk.size;
        this.map = map || null;
        
        this.values = [];
        this.mapping();

    }

    render(time) {

        this.values.map((value, index)=> {

            let 
                height = Math.abs(value.height * 50) + 1,
                color = "#af8c60";

            // Water
            if (height < config.level.water)
                color = `hsl(231, 98%, ${ 55 + Math.sin(time / 40 - index * 2) * 3 }%)`
            // Sand
            if (height > config.level.sand)
                color = "#D9AD77"
            // Ground
            if (height > config.level.ground)
                color = `hsl(141, 83%, ${ 35 - height / 2 + 15 }%)`;
            // Mountains
            if (height > config.level.mountains)
                color = `hsl(0, 0%, ${ 30 - height / 2 + 15 }%)`;
            // Mountain's snow
            if (height > config.level.mountains_snow)
                color = "#fff";
            
            draw.rect(color, value.x * config.chunk.tile_size, value.y * config.chunk.tile_size, config.chunk.tile_size);

        })

        this.createChunk();

    }
    mapping() {

        this.values = [];

        for (let count_x = 0; count_x < this.size; count_x ++) {
            for (let count_y = 0; count_y < this.size; count_y ++) {

                this.values.push({
                    x: count_x + this.x * this.size, y: count_y + this.y * this.size,
                    height: noise.simplex2((count_x + this.x * this.size) / 20, (count_y + this.y * this.size) / 20)
                });

            }
        }

    }

    createChunk() {

        const
            size = config.chunk.size * config.chunk.tile_size,
            x = this.x * size,
            y = this.y * size;

        if (x + size * 2 < camera.x) {
            this.x += 3;
            this.mapping();
        }
        if (x - size > camera.x) {
            this.x -= 3;
            this.mapping();
        }
        if (y + size * 2 < camera.y) {
            this.y += 3;
            this.mapping();
        }
        if (y - size > camera.y) {
            this.y -= 3;
            this.mapping();
        }

        // if (!this.map) return;
        // const
        //     size = config.chunk.size * config.chunk.tile_size + 50,
        //     x = this.x * size - 25,
        //     y = this.y * size - 25;


        // if (
        //     (camera.x > x + size ||
        //     camera.x < x ||
        //     camera.y > y + size ||
        //     camera.y < y) && this.map.a < 2
        // )
        //     this.map.a ++;
        // else
        //     this.map.a = 0;

        // console.log(this.map.a);

        // if (this.map.a > 1) return;

        // if (camera.x > x + size)
        //     this.map.chunks.push(new Chunk(this.x + 1, 0));
        // if (camera.x < x)
        //     this.map.chunks.push(new Chunk(this.x - 1, 0));
        // if (camera.y > y + size)
        //     this.map.chunks.push(new Chunk(0, this.y + 1));
        // if (camera.y < y)
        //     this.map.chunks.push(new Chunk(0, this.y - 1));

    }

}

export default Map;