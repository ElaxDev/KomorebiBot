const { MessageEmbed } = require('discord.js');
const economy = require('../../scripts/managers/economy_manager');

module.exports.run = async (message, bot, args) => {
  let target;
  let embed = new MessageEmbed();
  target = message.mentions.users.first();
  if(!target) {
    embed
    .setDescription('You need to mention a user!')
    .setFooter(`Use ${bot.prefix}help to get help!`)
    .setColor('#ff3030');
    return message.channel.send(embed);
  }

  if (!args[1]) {
    embed
    .setDescription('You need to specify an amount of coins!')
    .setColor('#ff3030');
    return message.channel.send(embed);
  }

  let coins = args[1];
  if(isNaN(coins)) {
    embed
    .setDescription('The amount of coins needs to be a number!')
    .setFooter(`Use ${bot.prefix}help to get help!`)
    .setColor('#ff3030');
    return message.channel.send(embed);
  }

  let guildId = message.guild.id;
  let userId = target.id

  const newCoins = await economy.addCoins(guildId, userId, coins);
  
  embed
  .setDescription(`${coins} coins were added to ${target.username} balance!\n
  They now have ${newCoins} coins.`)
  .setColor('#ffff00');
  message.channel.send(embed);
};

module.exports.info = {
  name: 'addbalance',
  description: 'Add an amount of coins to a user',
  permissions: ['ADMINISTRATOR'],
  expectedArgs: '<@User> <Quantity>'
};
