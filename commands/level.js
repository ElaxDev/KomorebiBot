const Discord = module.require("discord.js");
const { add_data } = require("../scripts/managers/data_manager.js");
let users_data = require("../resources/users_data.json");

module.exports.run = async (bot, message, args, help) => {

  if(!users_data[message.author.id]) {
    add_data(message.author.id,[1,0,5]);
  }
  let currentxp = users_data[message.author.id].Xp;
  let currentlevel = users_data[message.author.id].Level;
  let nextLevel = currentlevel * 300;
  let difference = nextLevel - currentxp;

  let levelEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("ff00ff")
  .addField("Level: ", currentlevel, true)
  .addField("XP: ", currentxp, true)
  .setFooter(`${difference} XP left for the next level.`, message.author.displayAvatarURL);
  message.channel.send(levelEmbed);
};

module.exports.config = {
  name: "level",
  description: "Shows yours or a user's current level",
  usage: "level [@user or username]",
  category: "Fun",
  level: 3
};
