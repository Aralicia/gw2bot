module.exports = function (bot, msg, args, config, gw2) {
  if (msg.author.id === config.bot_owner && args.length >= 4) { //need to do this check differently
    bot.createMessage(msg.channel.id, 'Fetching..').then(message => {
      gw2.getWorldName(args, (response) => {
        bot.editMessage(message.channel.id, message.id, response)
      })
    })
  } else return bot.createMessage(msg.channel.id, 'Please enter your world ID.')
}
