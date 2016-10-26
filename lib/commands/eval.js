module.exports = {
  execute : async message => {
    if(message.author.id !== config.bot_owner) return
    try {
      var res = eval(message.content)
      bot.createMessage(message.channel.id, '````js\n' + res + '```')
    }
    catch(e) {
      res = e.message
      bot.createMessage(message.channel.id, '````js\n' + res + '```')
    }
  },
  description : 'eval something'
}
