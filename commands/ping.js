const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, help) => {

  message.channel.send("**Pong!! >3< ~<3**");

};
module.exports.config = {
  name: "ping",
  usage: "",
  level: 3
};
