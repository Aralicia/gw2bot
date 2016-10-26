module.exports = {
  execute : async message => {
    const msg = await bot.createMessage(message.channel.id, 'Fetching..')
    try {
      let world = await gw2.getWorldName()
      bot.editMessage(message.channel.id, msg.id, world)
    } catch (error) {
      bot.editMessage(message.channel.id, msg.id, 'Error: ' + error)
    }
  },
  description : 'get world name or something fam'
}
