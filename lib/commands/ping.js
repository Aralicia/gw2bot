module.exports = {
  execute : async message => {
    try {
    let hr = process.hrtime()
    const msg = await bot.createMessage(message.channel.id, 'Pong!')
    let exec = Math.round(process.hrtime(hr)[1] / 1000000)
    bot.editMessage(msg.channel.id, msg.id, 'Pong! Latency:`' + exec + 'ms`')
  } catch (e) {
    bot.createMessage(message.channel.id, 'Something went terribly wrong.')
  }
  },
  description : 'ping pong'
}
