var http = require("http");

const {v4:uuid4} = require("uuid")
const todos = [
  {
    "title":"今天第一條",
    "id" : uuid4()
  },
  {
    "title":"今天第二條",
    "id" : uuid4()
  }
]
console.log('test')

const requestListener = (request , response) =>{
  console.log(request.url)
  console.log(request.method)
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  }
  if (request.url == '/todos' && request.method == 'GET'){
    response.writeHead(200, headers);
    response.write(JSON.stringify({
      "status":"success",
      "data": todos
    }));
    response.end();
  }else if(request.method == 'OPTIONS'){
    response.writeHead(200, headers);
    response.write(JSON.stringify({
      "status":"success",
      "data":[]
    }));
    response.end()
  }else if(request.url == '/' && request.method == 'DELETE'){
    response.writeHead(200, headers);
    response.write("Delete!");
    response.end();
  }else {
    response.writeHead(404, headers);
    response.write(JSON.stringify({
      "status":"false",
      "message":"無此網站"
    }));    response.end();
  }
}
const server = http.createServer(requestListener)
server.listen(3005)