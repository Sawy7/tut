const http = require("http");
const fs = require("fs");
const document = require("html-element").document;
const { timeLog } = require("console");
const serverPort = 8080;


const requestListener = async function (req, res) {
    res.writeHead(200, {"content-type": "text/html"});
    //res.write(req.url);
    //fs.createReadStream("./htmlTests/head.html").pipe(res);

    var headHTML = await fs.promises.readFile("./htmlTests/head.html", "utf8");
    var mainHTML = await fs.promises.readFile("./htmlTests/mainTable.html", "utf8");
    var tailHTML = await fs.promises.readFile("./htmlTests/tail.html", "utf8");

    res.write(headHTML);
    res.write(testStr);
    res.write(mainHTML);
    res.write(tailHTML);
    res.end();
}

const server = http.createServer(requestListener);
server.listen(serverPort);

console.log("Server running on " + serverPort);

var testh = document.createElement("h3");
testh.innerHTML = "Toto je NODE test";
console.log(testh.outerHTML);