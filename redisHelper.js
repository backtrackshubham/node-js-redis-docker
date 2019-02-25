let Redis = require('ioredis');
 //Expect that redis server running on host on localhost:6379
let redis = new Redis();


let redisSet = (key, value) => {
	redis.set(key, value)
}

let redisGet = (key) => {

	let value = redis.get(key, function (err, result) {
		if(err){
			return "value not found first set it"
		} else {
			return `value for ${key} is ${result}`
		}
	});
}

module.exports = {
	redisGet,
	redisSet,
	redis
}


