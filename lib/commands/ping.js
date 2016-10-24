module.exports = function (bot, msg, args) {
  var hr = process.hrtime()
  bot.createMessage(msg.channel.id, 'Pong!').then(message => {
    var exec = Math.round(process.hrtime(hr)[1] / 1000000)
    bot.editMessage(msg.channel.id, message.id, 'Pong! Latency: `' + exec + 'ms`')
  })
}
