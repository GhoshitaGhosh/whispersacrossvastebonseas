const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { performance } = require('perf_hooks');

const dom = new JSDOM(`<!DOCTYPE html><div id="game-screen"></div>`);
const document = dom.window.document;
const gameScreen = document.getElementById('game-screen');

const CONFIG = { MAP_HEIGHT: 20, MAP_WIDTH: 40 };

function initGameScreen_string() {
    gameScreen.innerHTML = '';
    let html = '';
    for (let y = 0; y < CONFIG.MAP_HEIGHT; y++) {
        for (let x = 0; x < CONFIG.MAP_WIDTH; x++) {
            html += `<span id="tile-${y}-${x}"></span>`;
        }
        html += '\n';
    }
    gameScreen.innerHTML = html;
}

function initGameScreen_array() {
    gameScreen.innerHTML = '';
    let html = [];
    for (let y = 0; y < CONFIG.MAP_HEIGHT; y++) {
        for (let x = 0; x < CONFIG.MAP_WIDTH; x++) {
            html.push(`<span id="tile-${y}-${x}"></span>`);
        }
        html.push('\n');
    }
    gameScreen.innerHTML = html.join('');
}

function initGameScreen_fragment() {
    gameScreen.innerHTML = '';
    const fragment = document.createDocumentFragment();
    for (let y = 0; y < CONFIG.MAP_HEIGHT; y++) {
        for (let x = 0; x < CONFIG.MAP_WIDTH; x++) {
            const span = document.createElement('span');
            span.id = `tile-${y}-${x}`;
            fragment.appendChild(span);
        }
        fragment.appendChild(document.createTextNode('\n'));
    }
    gameScreen.appendChild(fragment);
}


// Warmup
for (let i = 0; i < 50; i++) {
    initGameScreen_string();
    initGameScreen_array();
    initGameScreen_fragment();
}

const ITERATIONS = 1000;

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

let start3 = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    initGameScreen_fragment();
}
let end3 = performance.now();

console.log(`String concat + innerHTML: ${end1 - start1} ms`);
console.log(`Array join + innerHTML: ${end2 - start2} ms`);
console.log(`Document Fragment: ${end3 - start3} ms`);
