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
  var commands = require('./commands.json')
} catch (e) {
  console.log(e.stack)
  console.log('Error: Could not load commands.')
}
try {
  var gw2 = require('./lib/GW2.js')
} catch (e) {
  console.log(e.stack)
  console.log('Error: Could not load GW2.')
}
var bot = new Eris(config.discord_token, {
  maxShards: 1,
  autoReconnect: true,
  disableEveryone: true
})

bot.on('messageCreate', (msg) => {
  if (msg.author.bot || !msg.channel.guild) return
  if (msg.content !== '?' && msg.content[0] === '?') {
    var splitIdx = msg.content.substring(1).indexOf(' ')
    var cmdInput = ''
    var cmdArgs = ''
    var cmd = ''

    if (splitIdx === -1) {
      cmdInput = msg.content.substring(1)
    } else {
      cmdInput = msg.content.substring(1, msg.content.indexOf(' '))
      cmdArgs = msg.content.substring(msg.content.indexOf(' ') + 1)
    }

    for (cmd in commands) {
      if (commands[cmd].command === cmdInput || (commands[cmd].hasOwnProperty('alias') && commands[cmd].alias.indexOf(cmdInput) !== -1)) {
        require('./lib/commands/' + commands[cmd].file)(bot, msg, cmdArgs, config, gw2)
        break
      }
    }
  }
})

bot.on('ready', () => {
  console.log('I am connected to ' + bot.guilds.size + ' server(s)')
})

process.on('SIGINT', () => {
  console.log('Interrupted, disconnecting!')
  bot.disconnect()
})

bot.connect()
