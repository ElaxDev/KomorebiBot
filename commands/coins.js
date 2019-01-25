const Discord = module.require('discord.js');
let coins = require('../coins.json');

module.exports.run = async (bot, message, args) => {
  if (args[0]) {
    const user = message.mentions.members.first().user;
    if (!user) {
      return message.reply("Por favor, use una mención válida si quiere ver el balance de alguien más.");
    }
    if(!coins[user.id]) {
      coins[user.id] = {
        coins: 0
      };
    }
    let userCoins = coins[user.id].coins;

    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(`${user.username} 💵`)
    .setColor("#ffff00")
    .addField("Balance:", `${user.username} tiene ${userCoins} monedas!`);

    return message.channel.send(coinEmbed)
    // .then(msg => {msg.delete(5000)});
  }

  if(!coins[message.author.id]) {
    coins[message.author.id] = {
      coins: 0
    };
  }

  let userCoins = coins[message.author.id].coins;

  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(`${message.author.username} 💵`)
  .setColor("#ffff00")
  .addField("Balance:", `Tienes ${userCoins} monedas!`);

  message.channel.send(coinEmbed)
  // .then(msg => {msg.delete(5000)});
}

module.exports.help = {
  name: "coins"
}
