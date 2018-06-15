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

}

function topple() {
    
}

function render() {

}

function draw() {
    window.requestAnimationFrame(draw);
    render();
    for (let index = 0; index < 100; index++) {
        topple();
        ctx.putImageData(imageData, 0, 0);
    }
}

setup();
draw();
