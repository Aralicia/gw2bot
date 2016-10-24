module.exports = function (bot, msg, args, config, gw2) {
  if (msg.author.id === config.bot_owner) {
      bot.createMessage(msg.channel.id, 'Fetching..').then(message => {
        gw2.getAccount(args, message, function(response, msg) {
          var expansion = ''
          if(response.access === 'HeartOfThorns') expansion = 'Heart of Thorns'
          if(response.access === 'guildwars2') expansion = 'Base Game'
          gw2.getWorldName(response.world, function(worldName, population) {
            bot.editMessage(message.channel.id, message.id, "```ruby\n Account: " + response.name + "\n World: " + worldName + "\n World Population: " + population + "\n Expansion: " + expansion + "```")
          })
        })
    })
  }
}
