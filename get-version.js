'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('package.json');
let json = JSON.parse(rawdata);
console.log(json.version)
fs.writeFileSync('version.txt', json.version);
