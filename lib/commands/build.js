module.exports = {
  execute : async message => {
    const msg = await bot.createMessage(message.channel.id, 'Fetching..')
    try {
    let build = await gw2.getBuild()
    bot.editMessage(message.channel.id, msg.id, build)
    } catch (error) {
      bot.editMessage(message.channel.id, msg.id, 'Error: ' + error)
    }
  },
  description : 'get build'
}
