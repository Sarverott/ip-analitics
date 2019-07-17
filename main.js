/*
Sett Sarverott
ipanalitics 5
2019
*/
const http=require("http"),
  url=require('url'),
  path=require('path'),
  fs=require('fs'),
  os=require('os'),
  cluster=require('cluster');

class Nett{
  constructor(id){
    this.status={
      doc:false,
      code:false,
      header:false,
      port:false
    };
    this.id=id;
    this.modified=function(){null;};
  }
  setDoc(data){
    this.doc=data;
    this.status.doc=true;
    this.lunchModifiedListener();
  }
  setConfig(code, header, port){
    this.port=port;
    this.status.port=true;
    this.code=code;
    this.status.code=true;
    this.header=header;
    this.status.header=true;
    this.lunchModifiedListener();
  }
  lunchModifiedListener(){
    if(this.isNettReady()){
      this.modified(this);
    }
  }
  isNettReady(){
    return this.status.doc
      &&
      this.status.code
      &&
      this.status.port
      &&
      this.status.header;
  }
}
function getClientIp(r){
  return r.headers['x-forwarded-for']
    ||
    r.connection.remoteAddress
    ||
    r.socket.remoteAddress
    ||
    r.connection.socket.remoteAddress
    ||
    null;
}
function prepareNett(nettHook, modifyListener){
  nettHook.modified=modifyListener;
  fs.readFile(
    path.resolve(__dirname, "./config/output.txt"),
    function(err, data){
      nettHook.setDoc(data);
    }
  );
  fs.readFile(
    path.resolve(__dirname, "./config/header.json"),
    function(err, data){
      data=JSON.parse(data);
      nettHook.setConfig(data.code, data.header, data.port);
    }
  );
}
function createName(n){
  var matrix="qwertyuiopasdfghjklzxcvbnm1234567890";
  var out="";
  while(n>0){
    out+=matrix[n%matrix.length];
    n=Math.floor(n/matrix.length);
  }
  return out;
}
function raportVisit(title, data, request, nettHook){
  var ip=getClientIp(request);
  var now=Date.now();
  var filename=createName(now);
  var method=request.method||null;
  var url=request.url||null;
  var httpVer=request.httpVersion||null;
  var headers=request.headers||null;
  var raport={
    ip,
    method,
    url,
    httpVer,
    headers
  };
  raport.time=now;
  fs.writeFile(
    path.resolve(__dirname, "./archive/"+sessionname+"/"+filename+"-"+nettHook.id),
    JSON.stringify(raport),
    function(err){
      if (err) debugOutput(`worker ${process.pid} error- ${err}`);
      debugOutput(`worker ${process.pid}- visit captured! ${filename}-${nettHook.id}`);
    }
  );
}
function sendDoc(response, nettHook){
  response.writeHead(nettHook.code, nettHook.header);
  response.write(nettHook.doc);
  response.end();
}
function createServer(nettHook){
  debugOutput(`worker ${process.pid} starts server on port 8080`);
  http.createServer(function(request, response){
    var input=""
    request.on('data',function(data){
      input+=data;
    });
    request.on('err',function(err){
      debugOutput(`worker ${process.pid} error- ${err}`);
    });
    request.on('end',function(){
      raportVisit("ok", input, request, nettHook);
      sendDoc(response, nettHook);
    });
  }).listen(nettHook.port);
}
function parseTime(now){
  var time="";
  time+=now.getFullYear();
  time+="-";
  time+=now.getMonth();
  time+="-";
  time+=now.getDate();
  time+=" ";
  time+=now.getHours();
  time+=":";
  time+=now.getMinutes();
  time+=":";
  time+=now.getSeconds();
  time+=":";
  time+=now.getMilliseconds();
  return time;
}
function mainWorker(){
  debugOutput(`new worker: ${process.pid} `);
  process.on('message', function(msg){
    sessionname=msg;
    var rootNett=new Nett(process.pid);
    prepareNett(rootNett, function(){
      createServer(rootNett);
    });
  });
}
function checkConfigSafety(){
  try{
    fs.accessSync(
      path.resolve(__dirname, "./config"),
      fs.constants.R_OK|fs.constants.W_OK
    );
  }catch(err){
    fs.mkdirSync(
      path.resolve(__dirname, "./config")
    );
  }
  try{
    fs.accessSync(
      path.resolve(__dirname, "./config/header.json"),
      fs.constants.R_OK|fs.constants.W_OK
    );
  }catch(err){
    fs.writeFileSync(
      path.resolve(__dirname, "./config/header.json"),
      '{"port":8080,"code":200,"header":{"Content-Type": "text/html"}}'
    );
  }
  try{
    fs.accessSync(
      path.resolve(__dirname, "./config/output.txt"),
      fs.constants.R_OK|fs.constants.W_OK
    );
  }catch(err){
    fs.writeFileSync(
      path.resolve(__dirname, "./config/output.txt"),
      '<!DOCTYPE html><html><head><title>404 NOT FOUND</title></head><body><h1>ERROR 404</h1><p>not found</p></body></html>'
    );
  }
  try{
    fs.accessSync(
      path.resolve(__dirname, "./archive"),
      fs.constants.R_OK|fs.constants.W_OK);
  }catch(err){
    fs.mkdirSync(path.resolve(__dirname, "./archive"));
  }
}
function mainMaster(){
  checkConfigSafety();
  sessionname=createName(Date.now());
  fs.mkdir(path.resolve(__dirname, "./archive/"+sessionname), { recursive: true }, function(err){
    if(err)throw err;
    debugOutput(`master ${process.pid} born`);
    cluster.on('message', function(worker, message, handle){
      if(arguments.length === 2) {
        handle = message;
        message = worker;
        worker = undefined;
      }
      debugOutput(message);
    });
    cluster.on('disconnect', function(worker, code, signal){
      debugOutput(`worker ${worker.process.pid} is losted (code:${code}, signal:${signal}) killing in progress`);
      worker.kill();
    });
    cluster.on('exit', function(worker, code, signal){
      debugOutput(`worker ${worker.process.pid} died (code:${code}, signal:${signal}) resurection in progress`);
      var tmp=cluster.fork();
      tmp.send(sessionname);
    });
    for(var i=0; i<os.cpus().length; i++) {
      var tmp=cluster.fork();
      tmp.send(sessionname);
    }
  });
}
function debugOutput(t){
  if(cluster.isMaster){
    t="~["+parseTime(new Date())+"]~: "+t;
    console.log(t);
    fs.appendFile(path.resolve(__dirname, "./archive/"+sessionname+"/_DEBUGRAPORT_"), t+"\n", function (err) {
      if(err) throw err;
    });
  }else{
    process.send(t);
  }
}
var sessionname="";
function main(){
  if(cluster.isMaster){
    mainMaster();
  }else{
    mainWorker();
  }
}
main();
