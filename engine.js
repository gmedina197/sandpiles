'use strict';
const canvas = document.getElementById('sandpiles');
const ctx = canvas.getContext('2d');

let width = canvas.width;
let height = canvas.height;

let imageData = ctx.createImageData(width, height);
let data = imageData.data;

let sandpiles = [];

function setupMatrix(w, h) {
    let matrix = [];
    for (let y = 0; y < h; y++) {
        matrix[y] = [];
        for (let x = 0; x < w; x++) {
            matrix[y][x] = 0;
        }
    }
    return matrix;
}

function setup() {
    sandpiles = setupMatrix(width, height);
    sandpiles[width / 2][height / 2] = 1000000000;
}

function topple() {
    let nextpiles = setupMatrix(width, height);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let num = sandpiles[x][y];
            if (num < 4) {
                nextpiles[x][y] = sandpiles[x][y];
            }
        }
    }

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let num = sandpiles[x][y];
            if (num >= 4) {
                nextpiles[x][y] += num - 4;
                if (x + 1 < width) nextpiles[x + 1][y]++;
                if (x - 1 >= 0) nextpiles[x - 1][y]++;
                if (y + 1 < height) nextpiles[x][y + 1]++;
                if (y - 1 >= 0) nextpiles[x][y - 1]++;
            }
        }
    }

    sandpiles = nextpiles;
}

function render() {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let num = sandpiles[x][y];
            if (num == 0) {
                imageData.data[x + y * width] = 122;
                imageData.data[x + y * width + 1] = 0;
                imageData.data[x + y * width + 2] = 229;
            } else if (num == 1) {
                imageData.data[x + y * width] = 255;
                imageData.data[x + y * width + 1] = 0;
                imageData.data[x + y * width + 2] = 0;
            } else if (num == 2) {
                imageData.data[x + y * width] = 255;
                imageData.data[x + y * width + 1] = 255;
                imageData.data[x + y * width + 2] = 0;
            } else if (num == 3) {
                imageData.data[x + y * width] = 0;
                imageData.data[x + y * width + 1] = 185;
                imageData.data[x + y * width + 2] = 63;
            }
        }
    }
}

function draw() {
    window.requestAnimationFrame(draw);
    render();
    for (let index = 0; index < 100; index++) {
        topple();
    }
    ctx.putImageData(imageData, 0, 0);
}

console.log(data.length);
setup();
draw();
/* for (let index = 0; index < 100000000; index++) {
    setTimeout(draw, 1000);
    i++;
} */
