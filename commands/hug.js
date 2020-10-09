const Discord = module.require('discord.js');
const client = module.require('nekos.life');
const neko = new client();

module.exports.run = async (bot, message, args) => {
  let image = await neko.sfw.hug();
  if (args[0]) {
    let mention = message.mentions.members.first();
    if (!mention) return message.channel.send("**¡Debes especificar un usuario válido si quieres abrazar a alguien más!**");
    let embed = new Discord.RichEmbed()
      .setColor("#f4adb1")
      .setDescription(`${message.author.username} ha abrazado a ${mention.user.username} owo`)
      .setImage(image.url);
    message.channel.send(embed);
  } else {
    let embed = new Discord.RichEmbed()
      .setColor("#f4adb1")
      .setDescription(`Toma un abrazo ${message.author.username} uwu`)
      .setImage(image.url);
    message.channel.send(embed);
  }
};

module.exports.config = {
  name: "hug",
  description: "Sends a hug to a user",
  usage: "hug [user]",
  category: "Fun",
  level: 3
};
