const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.channel.send("**Pong!! >3< ~<3**");

}
module.exports.help = {
  name: "ping"
}
