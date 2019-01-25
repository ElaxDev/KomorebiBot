const Discord = module.require('discord.js');
const info = module.require('./help.js')

module.exports.run = async (bot, message, args, help) => {
  if(!args[0]) {
    message.channel.send("¡Necesitas especificar a quien quieres abrazar!\n Si no tienes amigos puedo dejar que me lo hagas uwu");
  }
  if(args[0])

}

module.exports.help = {
  name: "hug",
  usage: ""
}
