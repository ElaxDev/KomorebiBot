const { MessageEmbed } = module.require('discord.js');
let users_data = require('../resources/users_data.json');

module.exports.run = async (bot, message, args, help) => {
  if (args[0]) {
    const user = message.mentions.members.first().user;
    let id = user.id;
    if (!user) return message.reply("Please mention a valid user.");
    if (id.startsWith("<@")) {
      id = id.slice(-1, 2);
    }
    let userCoins = users_data[id].Coins;
    let coinEmbed = new MessageEmbed()
    .setAuthor(`${user.username} 💵`, message.author.displayAvatarURL)
    .setColor("#ffff00")
    .addField("Balance:", `${user.username} has ${userCoins} coins!`);

    return message.channel.send(coinEmbed);
  }
  let userCoins = users_data[message.author.id].Coins;

  let coinEmbed = new MessageEmbed()
  .setAuthor(`${message.author.username} 💵`)
  .setColor("#ffff00")
  .addField("Balance:", `You have ${userCoins} coins!`);

  message.channel.send(coinEmbed);
};

module.exports.config = {
  name: "coins",
  description: "Shows how many coins a user has",
  usage: "coins [user]",
  category: "Fun",
  level: 3
};
