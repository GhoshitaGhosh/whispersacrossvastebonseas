const assert = require('assert');
const getDistance = require('./extractor');

console.log('🧪 Testing getDistance utility function...');

const testCases = [
    { name: 'Identical points', args: [0, 0, 0, 0], expected: 0 },
    { name: 'Positive coordinates', args: [1, 1, 2, 2], expected: 2 },
    { name: 'Negative coordinates', args: [-1, -1, 1, 1], expected: 4 },
    { name: 'Mixed coordinates', args: [-1, 5, 2, -3], expected: 11 },
    { name: 'Large values', args: [1000, 2000, 5000, 10000], expected: 12000 },
    { name: 'Horizontal distance only', args: [1, 5, 10, 5], expected: 9 },
    { name: 'Vertical distance only', args: [3, 2, 3, 8], expected: 6 },
    { name: 'Zero distance (different inputs)', args: [5, 5, 5, 5], expected: 0 },
    { name: 'Swapped coordinates', args: [10, 5, 1, 5], expected: 9 },
];

let passed = 0;
testCases.forEach((tc, index) => {
    try {
        const actual = getDistance(...tc.args);
        assert.strictEqual(actual, tc.expected, `Case ${index + 1} (${tc.name}) failed: expected ${tc.expected}, but got ${actual}`);
        console.log(`✅ Passed: ${tc.name}`);
        passed++;
    } catch (err) {
        console.error(`❌ Failed: ${tc.name}`);
        console.error(err.message);
        process.exit(1);
    }
});

console.log(`\n🎉 All ${passed} tests passed successfully!`);
