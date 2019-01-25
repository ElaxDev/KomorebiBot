const Discord = module.require('discord.js');
const fs = module.require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args, help) => {

  if(!coins[message.author.id]) {
    return message.reply("¡No tienes monedas para pagar!");
  }

  let payUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]);

  if(!coins[payUser.id]) {
    coins[payUser.id] = {
      coins: 0
    };
  }

  let payCoins = coins[payUser.id].coins;
  let senderCoins = coins[message.author.id].coins;

  if(senderCoins < args[0]) return message.reply("¡No tienes suficientes monedas para pagar esta cantidad!");

  coins[message.author.id] = {
    coins: senderCoins - parseInt(args[0])
  };

  coins[payUser.id] = {
    coins: payCoins + parseInt(args[0])
  };

  message.channel.send(`${message.author.username} le ha dado a ${payUser} ${args[0]} monedas.`);

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if(err) console.log(err)
  });

}

module.exports.help = {
  name: "pay",
  usage: ""
}
