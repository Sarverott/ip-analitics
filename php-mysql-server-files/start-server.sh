#!/bin/bash
nodejs ipanalitics.js
if(typeof(req.headers['x-forwarded-for'])=='undefined'){
	visitIp=req.headers['x-forwarded-for'];
}else if(typeof(req.connection.remoteAddress)=='undefined'){
	visitIp=req.connection.remoteAddress;
}else if(typeof(req.socket.remoteAddress)!='undefined'){
	visitIp=req.socket.remoteAddress
}else if(req.connection.socket.remoteAddress)!='undefined'){
	visitIp=req.connection.socket.remoteAddress;
}