'use strict';
var express = require('express'),
    path = require('path'),
    fs = require('fs');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!')
})

// app.listen(3000,function(){
//     console.log('server running at http://127.0.0.1:3000')
// })

var root = path.resolve(process.argv[2] || '.');

// console.log('root:'+root)

app.get('/test', function (req, res) {
    fs.readFile('./koa/file1.txt', function (err, data) {
        if (err) {
            res.status(500).send('read file1 error');
        } else {
            fs.readFile('koa/file2.txt', function (err, data) {
                if (err) {
                    res.status(500).send('read file2 error');
                } else {
                    res.status(200).type('text/plain').send(data);
                }
            })
        }
    })
})
app.listen(3000, function () {
    console.log('server running at http://127.0.0.1:3000')
})


