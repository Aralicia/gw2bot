module.exports = {
  execute : async (message, bot) => {
    var expansion = ''
    const msg = await bot.createMessage(message.channel.id, 'Fetching..')
    try {
    let result = await gw2.getAccount(message.content)
    let world = await gw2.getWorldName(result)
    result.access === 'HeartofThorns' ? expansion = 'Heart of Thorns' : null
    result.access === 'guildwars2' ? expansion = 'Base Game' : null
    let accountStats = '```js\n Account: ' + result.name + ' \n World: ' + world.name + ' \n World Population: ' + world.population + ' \n Expansion: ' + expansion + '```'
    bot.editMessage(msg.channel.id, message.id, accountStats)
    } catch (error) {
    bot.editMessage(msg.channel.id, message.id, "Error: " + error)
    }
  },
  description: 'get account info'
}
