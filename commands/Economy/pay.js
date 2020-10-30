const { MessageEmbed } = require('discord.js');
let economy = require('../../scripts/managers/economy_manager');

module.exports.run = async (message, bot, args) => {
  let mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let { guild, author } = message;
  let coinsToGive = args[1];

  if (!mention) return message.reply("Please specify someone to give coins to.");
  if (mention.user.id === bot.user.id) return message.reply("Thank you, but I think you should give those coins to someon who needs them more than me.");
  if (mention.user.id === author.id) return message.reply("You can't give coins to yourself!");
  if (isNaN(coinsToGive)) return message.reply("The quantity should be a number!");

  const coinsOwned = await economy.getCoins(guild.id, author.id);
  if(coinsOwned < coinsToGive) {
    return message.reply(`You don't have ${coinsToGive} coins!`);
  }

  const remainingCoins = await economy.addCoins(guild.id, author.id, coinsToGive * -1);
  const newBalance = await economy.addCoins(guild.id, mention.id, coinsToGive);

  let givenEmbed = new MessageEmbed()
  .setAuthor(`${author.username} 💵`, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
  .setColor('#ffff00')
  .addField('Info:', `${coinsToGive} coins has been transferred to <@${mention.id}>'s account succesfully!\n
  <@${author.id}> now have ${remainingCoins} coins left.`)
  .setTimestamp();

  message.channel.send(givenEmbed);
};

module.exports.info = {
  name: 'pay',
  description: 'Transfer a quanity of coins to a user',
  expectedArgs: '<@User> <Amount of coins>'
};
