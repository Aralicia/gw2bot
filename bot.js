try {
  var Eris = require('eris')
} catch (e) {
  console.log(e.stack)
  console.log('Error: Could not load Eris.')
}
try {
  var config = require('./config.json')
} catch (e) {
  console.log(e.stack)
  console.log('Error: Could not load config.')
}
try {
  var gw2 = require('./lib/GW2.js')
} catch (e) {
  console.log(e.stack)
  console.log('Error: Could not load GW2.')
}
const bot = new Eris(config.discord_token, {
  maxShards: config.shardCount,
  autoReconnect: true,
  disableEveryone: true
})
bot.commands = {}

bot.on('messageCreate', (msg) => {
  if (msg.author.bot || !msg.channel.guild) return
  if(config.command_identifiers.indexOf(msg.content[0]) != -1) {
    const sep = msg.content.indexOf(' ')
    const cmd = ( sep != -1 ? msg.content.substring(1, sep) : msg.content.substring(1) )
    msg.content = msg.content.replace('?', '').trim();
    require('./lib/commandLoader.js')(bot)
    if(cmd in bot.commands) {
      bot.commands[cmd].execute(msg, bot);
    }
  }
})

bot.on('ready', () => {
  console.log('I am connected to ' + bot.guilds.size + ' server(s)')
  if(config.cyclePlaying === true) {
    bot.shards.forEach(shard => {
      let current = config.playing[(Math.random() * config.playing.length)]
      shard.editStatus(config.playingStatus, {current})
    })
  }
})

bot.on('shardResume', shard => {
  console.log("Shard #"+shard+" has reconnected!")
})
bot.on('shardDisconnect', (error, shard) => {
  console.log("Shard #"+shard+" has disconnected!")
  console.log(error)
})
setInterval(() => {
  if(config.cyclePlaying === true) {
    bot.shards.forEach(shard => {
      let current = config.playing[(Math.random() * config.playing.length)]
      shard.editStatus(config.playingStatus, {current})
    })
  }
}, 6e+5)

process.on('SIGINT', () => {
  console.log('Interrupted, disconnecting!')
  bot.disconnect()
  process.exit(0)
})

bot.connect().then(console.log("Logged in"))
