export const
    cvs = document.querySelector("canvas"),
    ctx = cvs.getContext("2d");
cvs.width = innerWidth;
cvs.height = innerHeight;

// noise.seed(Date.now());

// for (var x = 0; x < 120; x++) {
//     for (var y = 0; y < 80; y++) {
//         var value = noise.simplex2(x / 40, y / 40);

//         // ctx.fillStyle = `hsl(${ Math.round(Math.random() * 360) }, 100%, 50%)`
//         ctx.fillStyle = `hsl(${ value * 130 }, 100%, 50%)`
//         ctx.fillRect(x * 10, y * 10, 10, 10);
//     }
// }

export const camera = {
    x: 0,
    y: 0
};

export const draw = {
    rect(color, x, y, width, height) {

        ctx.save();
        ctx.fillStyle = color;

        ctx.translate(x - (camera.x - Math.round(innerWidth / 2)), y - (camera.y - Math.round(innerHeight / 2)));

        ctx.rect(-width / 2, -(height || width) / 2, width, height || width);

        ctx.fill();
        ctx.beginPath();
        ctx.restore();

    }
}

export function render() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
}