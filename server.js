let http = require('http');
let url = require('url');
let redis = require('./redisHelper.js')

http.createServer(function (req, res) {
	let paresedUrl = url.parse(req.url, true);
	let requestQuery = paresedUrl.query;
	let requestPath = paresedUrl.path;
	if(Object.keys(requestQuery).length == 1){ //part handles Set for redis
		let key = Object.keys(requestQuery);
		handleRedisSet(requestQuery);
		res.writeHead(200, {'Content-Type': 'text/plain'});
  		res.end(`Value for ${key[0]} has been set to ${requestQuery[key[0]]}`);
	}else if(requestPath.split('/').length == 3 && requestPath.split('/')[1] == "get"){ //part handles Query from redis
		redis.redis.get(requestPath.split('/')[2], function (err, result) {
		res.writeHead(200, {'Content-Type': 'text/plain'})
			if(err){
				res.end("value not found first set it");
			} else {
				res.end(`value for ${requestPath.split('/')[2]} is ${result}`);
			}
		});
	}else{
		res.writeHead(200, {'Content-Type': 'text/plain'});
  		res.end('Hello Welcome to redis Example please enter you string to set in redis using url like localhost:1234/?foo=bar and then get using localhost:1234/foo');
  		console.log('Server Running at localhost:1234')
	}
}).listen(1234);

function handleRedisSet(query) {
		let key = Object.keys(query);
		redis.redisSet(key[0], query[key[0]])
}