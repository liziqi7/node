// stream用于node中流数据的交互接口

const fs = require('fs');

const rs = fs.createReadStream('./02-conf.js');
const ws = fs.createWriteStream('./02-conf2.js');

rs.pipe(ws);

// 二进制非常友好
const rs2=fs.createReadStream('./01.jpg');
const ws2=fs.createWriteStream('./02.jpg');
rs2.pipe(ws2);


