const { MessageEmbed } = require('discord.js');
const client = require('nekos.life');
const neko = new client();

module.exports.run = async (message, bot, args) => {
  let image = await neko.sfw.hug();
  let embed = new MessageEmbed()
  .setColor('#f4adb1')
  .setImage(image.url);
  if (args[0]) {
    let mention = message.mentions.members.first();
    if (!mention) return message.channel.send("**You have to specify a valid user if you want to hug someone else!**");
    embed.setDescription(`${message.author.username} gave ${mention.user.username} a hug owo`);
    message.channel.send(embed);
  } else {
    embed.setDescription(`Here ${message.author.username} have a hug uwu`);
    message.channel.send(embed);
  }
};

module.exports.info = {
  name: 'hug',
  description: 'Sends a hug to a user',
  expectedArgs: '[User]'
};
