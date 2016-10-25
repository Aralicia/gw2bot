try {
  var request = require('request-promise')
} catch (e) {
  console.log(e.stack)
  console.log('Error: Could not load request.')
}
try {
  var config = require('../config.json')
} catch (e) {
  console.log(e.stack)
  console.log('Error: Could not load config.')
}
var url = 'https://api.guildwars2.com'
var api = {}


exports.getBuild = function (args, callback) {
	request({
		uri: url + '/v2/build',
		json: true,
		timeout: 10000
	}).then(function(response) {
			callback("Guild Wars 2 Build: `"+response.id+"`")
	})
	.catch(function(err) {
		console.log(err)
		callback("Error: ```"+err+"```")
	})

}

exports.getAccount = function(args, message, callback) {
	request({
		uri: url + '/v2/account',
		json: true,
		headers: {Authorization: config.keys.gw2_token}
	}).then(function(response) {
		console.log("response successful(?)")
		callback(response)
	})
	.catch(function(err) {
		console.log("Error found")
		console.log(err)
		callback(err)
	})
}

exports.getWorldName = function(world, callback) {
	request({
		uri: url + '/v2/worlds?id=' + world,
		json: true
	}, (error, result, body) => {
		if(exports.getWorld() === false) return callback("`Error: World doesn't exist.`")
		if (result.statusCode === 200 && body && !error) {
			var worldName = body.name
			var population = body.population
			callback(worldName, population)
		} else {
			callback("Error: Could not fetch data from GW2's API.")
		}
	})
}

exports.getWorld = function (world_id, callback) {
	exports.getWorlds(function(worlds) {
		var world = parseInt(world_id)
		return worlds.indexOf(world) > 0
	})
}

exports.getWorlds = function (callback) {
	request({
		uri: url + '/v2/worlds',
		json: true
	}, (error, result, body) => {
		if (result.statusCode === 200 && body && !error) {
			var worlds = body
			callback(worlds)
		} else {
			callback("`Error: Could not fetch data from GW2's API.`")
		}
	})
}
