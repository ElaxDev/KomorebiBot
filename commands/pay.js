const Discord = module.require('discord.js');
const fs = module.require("fs");
const data_manager = require('../scripts/managers/data_manager.js')
let users_data = require("../resources/users_data.json");

module.exports.run = async (bot, message, args, help) => {
  let mention = message.mentions.members.first() || message.guild.members.get(args[1]); //Separado es mejor

  if (users_data[message.author.id].Coins == 0 || users_data[message.author.id] < args[0]) {
    return message.reply("¡No tienes monedas para pagar!");
  }
  if (mention.user.id === bot.id) return message.reply("¡No puedes darme monedas a mi!");
  if (mention.user.id === message.author.id) return message.reply("¡No puedes darte monedas a ti mismo!");
  if (!user) return message.reply("¡Debes especificar a que usuario quieres darle las monedas!");
  if (args[0].isNaN === true) return message.reply("La cantidad debe ser un número!");

  users_data[message.author.id].Coins -= parseInt(args[0])
  users_data[mention.user.id].Coins += parseInt(args[0])

  let given = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL)
  .setColor('#ffff00')
  .addField("Info:", `Se le han transferido ${args[0]} monedas a ${mention.user.username} correctamente.`);

  message.channel.send(given);
}

module.exports.help = {
  name: "pay",
  usage: "if.pay [Cantidad] @usuario"
}
