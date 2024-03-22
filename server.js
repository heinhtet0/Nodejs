const http = require('http');
const fs = require('fs');
const _ = require('lodash');

console.log(_.random(20));

const server = http.createServer((req,res) => {
    let filename;
    switch (req.url) {
        case '/':
            filename = "home.html";
            res.statusCode = 200;
            break;
        case '/contact':
            filename = "contact.html";
            res.statusCode = 200;
            break;
        case '/contact-us':
            res.statusCode = 301;
            res.setHeader('Location','/contact')
            break;
        case '/about':
            filename = "about.html";
            res.statusCode = 200;
            break;
        default:
            filename = "404.html";
            res.statusCode = 404;
            break;
    }

    res.setHeader('Content-Type','text/html');
    fs.readFile('./views/'+filename,(err,data) => {
        if(err) {
            console.log(err)
            res.end();
        }else {
            res.write(data);
            res.end();
        }
    })    
})

server.listen(3000,'localhost',() => {
    console.log('server listening on port 3000');
})