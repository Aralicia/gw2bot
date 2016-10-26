try {
  var fs = require('fs')
}
catch(e){
  console.log(e.stack)
  console.log('Error: Could not load fs')
}
try {
  var path = require('path')
}
catch(e){
  console.log(e.stack)
  console.log('Error: Could not load path')
}
module.exports = (bot) => {
  const files = fs.readdirSync(path.resolve(__dirname+'/commands'))
  for(const file of files) {
    if(file.endsWith('.js')) {
      const command = bot.commands[file.slice(0, -3)] = require(__dirname+'/commands/'+file)
      command.name = file.slice(0, -3)
    }
  }
}
