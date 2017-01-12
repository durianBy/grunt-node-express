var http = require("http");
var fs = require("fs");
function serveStaticFile(res,path,contentType,responseCode){
	if(!responseCode) responseCode = 200;
	console.log(__dirname);
	fs.readFile(__dirname + path,function(err,data){
		if(err){
			res.write(500,{'Content-Type':'text/plain'});
			res.end('500-Internal Error');
		}else{
			res.writeHead(responseCode,{'Content-Type':contentType});
			res.end(data);
		}
	})
}
http.createServer(function(req,res){
	var path = req.url.replace(/\/?(?:\?.*)?$/,'');
	switch (path){
		case '':serveStaticFile(res,'/public/home.html','text/html');break;
		case '/about':serveStaticFile(res,'/public/about.html','text/html');break;
		default:serveStaticFile(res,'/public/404.html','text/html',404);break;
	}
	/*res.writeHead(200,{'Content-Type':'text/plain'});
	res.end('Hello World!');*/
}).listen(3000);
console.log("这是我的第一个小程序！");








