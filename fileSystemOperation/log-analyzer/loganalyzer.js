const fs = require('fs');
const readline = require('readline');

let infoCount = 0;
let warningCount = 0;
let errorCount = 0;
let totalLines = 0;

const readStream = fs.createReadStream('app.log');

const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    totalLines++;

    if (line.includes('INFO')) infoCount++;
    else if (line.includes('WARNING')) warningCount++;
    else if (line.includes('ERROR')) errorCount++;
});

rl.on('close', () => {
    console.log('Log File Summary Report');
    console.log('---------------------------');
    console.log('Total Lines   :', totalLines);
    console.log('INFO Count    :', infoCount);
    console.log('WARNING Count :', warningCount);
    console.log('ERROR Count   :', errorCount);
});