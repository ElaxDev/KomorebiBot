const Discord = module.require("discord.js");
const data_manager = require("../scripts/data_manager.js")
let users_data = require("../resources/users_data.json");

module.exports.run = async (bot, message, args, help) => {


  if(!users_data[message.author.id]) {
    data_manager.add_data(message.author.id,[1,0,5])
  }
  let currentxp = users_data[message.author.id].Xp;
  let currentlevel = users_data[message.author.id].Level;
  let nextLevel = currentlevel * 300;
  let difference = nextLevel - currentxp;

  let levelEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("ff00ff")
  .addField("Nivel: ", currentlevel, true)
  .addField("XP: ", currentxp, true)
  .setFooter(`${difference} XP para el siguiente nivel.`, message.author.displayAvatarURL);
  message.channel.send(levelEmbed);
}

module.exports.help = {
  name: "level",
  usage: ""
}
