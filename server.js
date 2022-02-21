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
  const header =  {"Content-Type": "text/plain"}
  if (request.url == '/' && request.method == 'GET'){
    response.writeHead(200, header);
    response.write("Hello World !");
    response.end();
  }else if(request.url == '/' && request.method == 'DELETE'){
    response.writeHead(200, header);
    response.write("Delete!");
    response.end();
  }else {
    response.writeHead(200, header);
    response.write("ERROR 404 !");
    response.end();
  }
}
const server = http.createServer(requestListener)
server.listen(3005)