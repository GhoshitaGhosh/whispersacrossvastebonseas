const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

const regex = /function getDistance\s*\(([^)]*)\)\s*\{([\s\S]*?)\}/;
const match = content.match(regex);

if (!match) {
    throw new Error('Could not find getDistance function in index.html');
}

const args = match[1].split(',').map(arg => arg.trim());
const body = match[2];

module.exports = new Function(...args, body);
