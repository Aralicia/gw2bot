try {
  const request = require('request')
} catch (e) {
  console.log(e.stack)
  console.log('Error: Could not load request.')
}
try {
  const config = require('../config.json')
} catch (e) {
  console.log(e.stack)
  console.log('Error: Could not load config.')
}
const url = 'https://api.guildwars2.com'


exports.getBuild = function (message) {
  return new Promise( function(resolve, reject){
	   request({
       uri: url + '/v2/build',
       json: true,
       timeout: 10000
     }, (error, result, body) => {
       if(error && result.statusCode !== 200) return reject(error)
       resolve(body)
     })
   })
}

exports.getAccount = function(message) {
  return new Promise( function(resolve, reject) {
    request({
      uri: url + 'v2/account',
      json: true,
      timeout: 10000,
      headers: {Authorization: config.keys.gw2_token}
    }, (error, result, body) => {
      if(error && result.statusCode !== 200) return reject(error)
      resolve(body)
    })
  })
}

exports.getWorldName = function(world) {
  return new Promise( function(resolve, reject) {
    request({
      uri: url + '/v2/worlds?id=' + world,
      json: true,
      timeout: 10000
    }, (error, result, body) => {
      if(error && result.statusCode !== 200) return reject(error)
      resolve(body)
    });
  });
}

exports.getWorld = async function (world_id, callback) {
  let result = await exports.getWorlds()
  let world = parseInt(world_id)
  return result.indexOf(world) > 0
}

exports.getWorlds = function() {
  return new Promise( function(resolve, reject) {
    request({
      uri: url + '/v2/worlds',
      json: true,
      timeout: 10000
    }, (error, result, body) => {
      if(error && result.statusCode !== 200) return reject(error)
      resolve(body)
    })
  })
}
