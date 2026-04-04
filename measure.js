const { performance } = require('perf_hooks');

const CONFIG = { MAP_HEIGHT: 20, MAP_WIDTH: 40 };

function initGameScreen_string() {
    let html = '';
    for (let y = 0; y < CONFIG.MAP_HEIGHT; y++) {
        for (let x = 0; x < CONFIG.MAP_WIDTH; x++) {
            html += `<span id="tile-${y}-${x}"></span>`;
        }
        html += '\n';
    }
    return html;
}

function initGameScreen_array() {
    let html = [];
    for (let y = 0; y < CONFIG.MAP_HEIGHT; y++) {
        for (let x = 0; x < CONFIG.MAP_WIDTH; x++) {
            html.push(`<span id="tile-${y}-${x}"></span>`);
        }
        html.push('\n');
    }
    return html.join('');
}

// Warmup
for (let i = 0; i < 1000; i++) {
    initGameScreen_string();
    initGameScreen_array();
}

const ITERATIONS = 10000;

let start1 = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    initGameScreen_string();
}
let end1 = performance.now();

let start2 = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    initGameScreen_array();
}
let end2 = performance.now();

console.log(`String concat: ${end1 - start1} ms`);
console.log(`Array join: ${end2 - start2} ms`);
