const Discord = module.require("discord.js");
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {


  if(!xp[message.author.id]) {
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }
  let currentxp = xp[message.author.id].xp;
  let currentlevel = xp[message.author.id].level;
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
  name: "level"
}
