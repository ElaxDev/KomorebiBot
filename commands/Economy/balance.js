const { MessageEmbed } = module.require('discord.js');
const economy = require('../../scripts/managers/economy_manager');

module.exports.run = async (message, bot, args) => {
  let user;
  if(args[0]) {
    user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.reply('Please mention a valid user.');
    user = user.user;
  } else {
    user = message.author;
  }   

  let userId = user.id;
  let guildId = message.guild.id;

  if (userId.startsWith('<@')) {
    userId = userId.slice(-1, 2);
  }
  let coins = await economy.getCoins(guildId, userId);
  let coinEmbed = new MessageEmbed()
  .setAuthor(`${user.username} 💵`, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
  .setColor("#ffff00")
  .setTimestamp();

  if(args[0]){
    coinEmbed.addField("Balance:", `${user.username} has ${coins} coins!`)
    return message.channel.send(coinEmbed);
  } else {
    coinEmbed.addField("Balance:", `You have ${coins} coins!`)
    return message.channel.send(coinEmbed);
  }
};

module.exports.info = {
  name: "balance",
  description: "Shows how many coins a user has, if the user is omitted shows your coins quantity",
  expectedArgs: '[User]'
};
