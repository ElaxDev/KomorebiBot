
module.exports.run = async (bot, message, args, help) => {

  message.channel.send("**Pong! >3<**");

};
module.exports.config = {
  name: "ping",
  description: "Checks if the bot is alive",
  usage: "ping",
  category: "Utility",
  level: 3
};
