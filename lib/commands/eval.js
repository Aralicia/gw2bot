module.exports = function (bot, msg, args, config, gw2) {
  if (msg.author.id === config.bot_owner) {
    var res = eval(args)
    bot.createMessage(msg.channel.id, '`' + res + '`')
  }
}
