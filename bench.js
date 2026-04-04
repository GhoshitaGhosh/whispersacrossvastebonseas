const { performance } = require('perf_hooks');

const CONFIG = {
    MAP_WIDTH: 40,
    MAP_HEIGHT: 20
};

const GAME_STATE = {
    structures: [],
    renderBuffer: Array.from({ length: CONFIG.MAP_HEIGHT }, () => Array(CONFIG.MAP_WIDTH).fill('.')),
};

for (let i = 0; i < 200; i++) {
    GAME_STATE.structures.push({
        x: Math.floor(Math.random() * CONFIG.MAP_WIDTH),
        y: Math.floor(Math.random() * CONFIG.MAP_HEIGHT),
        isReinforced: Math.random() > 0.5
    });
}

const renderGrid = Array.from({ length: CONFIG.MAP_HEIGHT }, () => Array(CONFIG.MAP_WIDTH).fill('.'));

function oldLookup() {
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

function newLookup() {
    let dummy = 0;

    // Pre-compute structures for O(1) lookup
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

function runBench() {
    // Warm up
    for (let i = 0; i < 100; i++) {
        oldLookup();
        newLookup();
    }

    const iter = 10000;
    const startOld = performance.now();
    for (let i = 0; i < iter; i++) {
        oldLookup();
    }
    const endOld = performance.now();
    console.log(`Old lookup took: ${endOld - startOld} ms`);

    const startNew = performance.now();
    for (let i = 0; i < iter; i++) {
        newLookup();
    }
    const endNew = performance.now();
    console.log(`New lookup took: ${endNew - startNew} ms`);
}

runBench();
