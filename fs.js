'use strict';

var fs = require('fs');

// fs.readFile('sample.txt','utf-8',function(err,data){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data)
//     }
// })

// fs.readFile('1.jpg',function(err,data){
//     if(err){
//         console.log(err)
//     }else{

//         // console.log(data)
//         // console.log(data.length+' bytes')

//         var text=data.toString('utf-8');
//         console.log(text);

//         var buf=Buffer.from(text,'utf-8');
//         console.log(buf);
//     }
// })

// var data=fs.readFileSync('sample.txt','utf-8');

// console.log(data);


// var data= fs.readFileSync('1.jpg');

// console.log(data);

// var data="Hello, nodejs!";

// fs.writeFile('output.txt',data,function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log('ok')
//     }
// })

// fs.writeFileSync('output.txt',data);
// console.log('ok')

// fs.stat('output.txt', function (err, stat) {
//     if (err) {
//         console.log(err)
//     } else {
//         //    console.log(typeof stat.isFile);

//         for (var i in stat) {
//             if (typeof stat[i] != "function") {
//                 console.log(i + ':' + stat[i])
//             }else{
//                 console.log(i + ':' + stat[i]())
//             }
//         }
//     }
// })
var stat = fs.statSync('output.txt');

for (var i in stat) {
    if (typeof stat[i] != "function") {
        console.log(i + ':' + stat[i])
    } else {
        console.log(i + ':' + stat[i]())
    }
}














