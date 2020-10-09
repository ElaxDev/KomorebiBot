const Discord = module.require('discord.js');
let users_data = require("../resources/users_data.json");

module.exports.run = async (bot, message, args, help) => {
  let mention = message.mentions.members.first() || message.guild.members.get(args[1]);

  if (users_data[message.author.id].Coins == 0 || users_data[message.author.id] < args[0]) {
    return message.reply("¡No tienes monedas para pagar!");
  }
  if (mention.user.id === bot.id) return message.reply("¡No puedes darme monedas a mi!");
  if (mention.user.id === message.author.id) return message.reply("¡No puedes darte monedas a ti mismo!");
  if (!user) return message.reply("¡Debes especificar a que usuario quieres darle las monedas!");
  if (args[0].isNaN === true) return message.reply("La cantidad debe ser un número!");

  users_data[message.author.id].Coins -= parseInt(args[0]);
  users_data[mention.user.id].Coins += parseInt(args[0]);

  let givenEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL)
  .setColor('#ffff00')
  .addField('Info:', `${args[0]} coins has been transferred to ${mention.user.username}'s account succesfully!`);

  message.channel.send(givenEmbed);
};

module.exports.config = {
  name: "pay",
  description: "Transfer a quanity of coins to a user",
  usage: "pay <quantity> <user>",
  category: "Fun",
  level: 3
};
