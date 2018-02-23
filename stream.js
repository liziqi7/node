'use strict';

var fs = require('fs');

// var re=fs.createReadStream('output.txt','utf-8');

// re.on('data',function(chunk){
//     console.log("Data:");
//     console.log(chunk)
// })
// re.on('end',function(){
//     console.log('end!')
// })
// re.on('error',function(err){
//     console.log('re error:'+err)
// })

// var ws=fs.createWriteStream('output1.txt','utf-8');
// ws.write('111111111');
// ws.write('aaaaa');
// ws.end(function(){
//     console.log('end') 
// });

// var ws=fs.createWriteStream('output2.txt');

// ws.write(new Buffer('a中文','utf-8'));

// var ws=fs.createWriteStream('output3.txt');
// ws.write('啦啦b\n');
// ws.write('b');
// ws.end();


var re=fs.createReadStream('output.txt');
var ws=fs.createWriteStream('output4.txt');
re.pipe(ws);



