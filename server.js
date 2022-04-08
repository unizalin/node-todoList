var http = require("http");

const {v4:uuidv4} = require("uuid")
const todos = []
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
  let body = ''
  request.on('data',chunk=>{
    body+=chunk
  })
 
  if (request.url == '/todos' && request.method == 'GET'){
    response.writeHead(200, headers);
    response.write(JSON.stringify({
      "status":"success",
      "data": todos
    }));
    response.end();
  }else if(request.url == '/todos' && request.method == 'POST'){
    request.on('end',()=>{
      try{
        const title = JSON.parse(body).title
        if(title !==undefined){
          const todo = {
            "title" : title,
            "id" : uuidv4()
          }
          todos.push(todo)
          response.writeHead(200, headers);
          response.write(JSON.stringify({
            "status":"success",
            "data": todos
          }));
        }else{
          response.writeHead(400, headers);
          response.write(JSON.stringify({
            "status":"false",
            "message": "欄位填寫錯誤，或無此 todo id"
          }));
        }
        response.end()
      }catch(error){
        response.writeHead(400, headers);
        response.write(JSON.stringify({
          "status":"false",
          "message": "欄位填寫錯誤，或無此 todo id"
        }));
        console.log(error,'程式錯誤')
        response.end()
      }

    })
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