module.exports = function (bot, msg, args, gw2) {
    bot.createMessage(msg.channel.id, 'Fetching..').then(message => {
      gw2.getBuild(args, (response) => {
        bot.editMessage(message.channel.id, message.id, response)
      })
    })
}
