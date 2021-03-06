var http = require("http");
const {v4:uuidv4} = require("uuid");
const errorHandle = require("./errHandle");
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
          errorHandle(response)
        }
        response.end()
      }catch(error){
        errorHandle(response)
        console.log(error,'程式錯誤')
      }

    })
  }else if(request.method == 'OPTIONS'){
    response.writeHead(200, headers);
    response.write(JSON.stringify({
      "status":"success",
      "data":[]
    }));
    response.end()
  }else if(request.url == '/todos' && request.method == 'DELETE'){
    todos.length=0
    response.writeHead(200, headers);
    response.write(JSON.stringify({
      "status":"success",
      "data":[],
    }));    
    response.end();
  }else if(request.url.startsWith('/todos/') && request.method == 'DELETE'){
    const id = request.url.split('/').pop()
    const index = todos.findIndex(element => element.id == id)
    console.log(id,index)
    if(index !== -1){
      todos.splice(index,1)
      response.writeHead(200, headers);
      response.write(JSON.stringify({
        "status":"success",
        "data":todos,
      }));    
      response.end();
    }else{
      errorHandle(response)
    }
  }else if(request.url.startsWith('/todos/') && request.method == 'PATCH'){
    request.on('end',()=>{
      try {
        const todo = JSON.parse(body).title
        const id = request.url.split('/').pop()
        const index = todos.findIndex(element => element.id == id)
        if(todo !== undefined  && index!== -1){
          todos[index].title = todo
          response.writeHead(200, headers);
          response.write(JSON.stringify({
            "status":"success",
            "data":todos,
          }));    
          response.end();
        }else{
          errorHandle(response)
        }
      } catch (error) {
        errorHandle(response)
      }
    })
  }else {
    response.writeHead(404, headers);
    response.write(JSON.stringify({
      "status":"false",
      "message":"無此網站"
    }));    response.end();
  }
}
const server = http.createServer(requestListener)
server.listen(process.env.PORT || 3005)