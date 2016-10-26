module.exports = {
  execute : async message => {
    let hr = process.hrtime()
    const msg = await bot.createMessage(msg.channel.id, 'Pong!').then(msg => {
      let exec = Math.round(process.hrtime(hr)[1] / 1000000)
      bot.editMessage(msg.channel.id, msg.id, 'Pong! Latency:`' + exec + 'ms`')
    }
  },
  description : 'ping pong'
}
