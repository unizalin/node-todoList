var http = require("http");
// http.createServer(function(request, response) {
//     console.log(request.url)
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.write("Hello World");
//     response.end();
// }).listen(8888);

const requestListener = (request , response) =>{
  console.log(request.url)
  console.log(request.method)

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World !");
  response.end();
}
const server = http.createServer(requestListener)
server.listen(3005)