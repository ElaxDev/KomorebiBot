const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let user = message.author;
  let avatarEmbed = new MessageEmbed();
  let msg = await message.channel.send("Generando avatar...");
  if (args[0]) {
    user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) {
      await msg.delete();
      return message.reply("Please mention a valid user!");
    }
  }
  let avatarUrl = await user.displayAvatarURL({ format:'png', dynamic: true, size: 512});
  avatarEmbed.setTitle(`${user.tag}'s Avatar`);
  avatarEmbed.setDescription(`[Avatar Url](${avatarUrl})`);
  avatarEmbed.setImage(avatarUrl);
  avatarEmbed.setColor(16035249);

  await msg.delete();
  return message.channel.send(avatarEmbed);
};

module.exports.config = {
  name: "avatar",
  description: "Sends the user avatar",
  usage: "avatar [user]",
  category: "Utility",
  level: 3
};
