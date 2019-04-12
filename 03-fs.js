const fs = require('fs');
//读取一个文件
const data = fs.readFileSync('./02-conf.js'); //阻塞操作
console.log(data);

// 异步
fs.readFile('./02-conf.js', (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});
console.log('other');

// promise
const {promisify} =require('util');
const readFile=promisify(fs.readFile);
readFile('./02-conf.js').then(data=>console.log(data))


// v10.0
// fs.promises API

const {promises} =require('fs');
promises.readFile('./02-conf.js').then(data=>console.log(data))

// generator

// async await






