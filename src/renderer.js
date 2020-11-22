export const
    cvs = document.querySelector("canvas"),
    ctx = cvs.getContext("2d");
cvs.width = 900;
cvs.height = 650;

export const camera = {
    x: 0,
    y: 0
};

export const draw = {
    rect(color, x, y, width, height) {

        ctx.save();
        ctx.fillStyle = color;

        ctx.translate(x - (camera.x - Math.round(cvs.width / 2)), y - (camera.y - Math.round(cvs.height / 2)));

        ctx.rect(-width / 2, -(height || width) / 2, width, height || width);

        ctx.fill();
        ctx.beginPath();
        ctx.restore();

    }
}

export function render() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
}