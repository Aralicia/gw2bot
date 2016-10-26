try {
  const fs = require('fs')
}
catch(e){
  console.log(e.stack)
  console.log('Error: Could not load fs')
}
try {
  const path = require('path')
}
catch(e){
  console.log(e.stack)
  console.log('Error: Could not load path')
}
module.exports =  {
  const files = fs.readdirSync(path.resolve('/commands'))
  for(const file of files) {
    if(file.endsWith('.js')) {
      const command = bot.commands[file.slice(0, 3)] = require('/commands', file)
      command.name = file.slice(0, -3)
    }
  }
}
