const { MessageEmbed } = module.require('discord.js');

module.exports.run = async (message, bot, args) => {
  let author = message.author;
  const helpEmbed = new MessageEmbed()
  .setAuthor(`${bot.user.username} help menu`, message.guild.iconURL({ dynamic: true }))
  .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, format:'png' }))
  .setFooter(`Requested by: ${author.username}`, author.displayAvatarURL({ dynamic: true }))
  .setTimestamp()
  .setColor(16035249);
  if (args[0]) {
    let command = await bot.commands.get(args[0]);
    if(!command) {
      let errorEmbed = new MessageEmbed()
      .setTitle('Command not found!')
      .setDescription(`That command doesn't exist, 
      to see a list of existing commands type: ${bot.prefix}help.`);
      return message.channel.send(errorEmbed);
    } else {
      helpEmbed.setTitle(command.info.name);
      if(command.info.expectedArgs) {
        helpEmbed.setDescription(`${command.info.description}\n\n
        \`Usage: ${bot.prefix}${command.info.name} ${command.info.expectedArgs}\``);
        return message.channel.send(helpEmbed);
      } else {
        helpEmbed.setDescription(`${command.info.description}\n\n
        \`Usage: ${bot.prefix}${command.info.name}\``);
        return message.channel.send(helpEmbed);
      }
    }
  } else {
    let commands = bot.commands.keyArray();
  
    helpEmbed.setTitle('List of available commands:')
    .setDescription(commands.join('\n'));
    return message.channel.send(helpEmbed);
  }
};

module.exports.info = {
  name: 'help',
  description: 'Shows the help for a command',
  expectedArgs: '[Command]'
};
