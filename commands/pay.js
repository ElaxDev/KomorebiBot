const Discord = module.require('discord.js');
const fs = module.require("fs");
let users_data = require("../resources/users_data.json");

module.exports.run = async (bot, message, args, help) => {
  let user = message.guild.member(message.mentions.users.first());
  if (!users_data[message.author.id].Coins) return message.reply("¡No tienes monedas para pagar!");
  if (user === message.author.id) return message.reply("¡No puedes darte monedas a ti mismo!");
  if (!args[1]) return message.reply("¡Debes especificar a que usuario quieres darle las monedas!");
  if (args[0].isdigit === false) return

  let payUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]);

  let payCoins = users_data[payUser].Coins;
  let senderCoins = users_data[message.author.id].Coins;

  if(senderCoins < args[0]) return message.reply("¡No tienes suficientes monedas para pagar esta cantidad!");

  users_data[message.author.id].Coins = senderCoins - parseInt(args[0])

  users_data[payUser].Coins = payCoins + parseInt(args[0])

  message.channel.send(`${message.author.username} le ha dado a ${payUser} ${args[0]} monedas.`);

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if(err) console.log(err)
  });

}

module.exports.help = {
  name: "pay",
  usage: "if.pay [Cantidad] @usuario"
}
