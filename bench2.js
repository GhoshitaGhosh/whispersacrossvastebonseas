const { performance } = require('perf_hooks');

const CONFIG = {
    MAP_WIDTH: 40,
    MAP_HEIGHT: 20
};

const GAME_STATE = {
    structures: [],
};

// Populate dummy structures
for (let i = 0; i < 50; i++) {
    GAME_STATE.structures.push({
        x: Math.floor(Math.random() * CONFIG.MAP_WIDTH),
        y: Math.floor(Math.random() * CONFIG.MAP_HEIGHT),
        isReinforced: Math.random() > 0.5
    });
}

function oldRender() {
    let dummy = 0;
    for (let y = 0; y < CONFIG.MAP_HEIGHT; y++) {
        for (let x = 0; x < CONFIG.MAP_WIDTH; x++) {
            const struct = GAME_STATE.structures.find(s => s.x === x && s.y === y);
            const isReinforced = struct ? struct.isReinforced : false;
            if (isReinforced) dummy++;
        }
    }
    return dummy;
}

function newRender() {
    let dummy = 0;

    // Create lookup map
    const structureMap = new Array(CONFIG.MAP_HEIGHT * CONFIG.MAP_WIDTH);
    for (let i = 0; i < GAME_STATE.structures.length; i++) {
        const s = GAME_STATE.structures[i];
        if (s.y >= 0 && s.y < CONFIG.MAP_HEIGHT && s.x >= 0 && s.x < CONFIG.MAP_WIDTH) {
            structureMap[s.y * CONFIG.MAP_WIDTH + s.x] = s;
        }
    }

    for (let y = 0; y < CONFIG.MAP_HEIGHT; y++) {
        for (let x = 0; x < CONFIG.MAP_WIDTH; x++) {
            const struct = structureMap[y * CONFIG.MAP_WIDTH + x];
            const isReinforced = struct ? struct.isReinforced : false;
            if (isReinforced) dummy++;
        }
    }
    return dummy;
}

// Warmup
for (let i = 0; i < 1000; i++) {
    oldRender();
    newRender();
}

const ITERATIONS = 10000;

const startOld = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    oldRender();
}
const endOld = performance.now();
console.log(`Old render loop: ${(endOld - startOld).toFixed(2)} ms`);

const startNew = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    newRender();
}
const endNew = performance.now();
console.log(`New render loop: ${(endNew - startNew).toFixed(2)} ms`);
console.log(`Improvement: ${((endOld - startOld) / (endNew - startNew)).toFixed(2)}x`);
