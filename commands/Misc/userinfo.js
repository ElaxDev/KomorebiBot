const { MessageEmbed } = module.require("discord.js");

module.exports.run = async (message, bot, args) => {
  let user = message.mentions.users.first() || message.author;
  let infoEmbed = new MessageEmbed()
    .setAuthor(user.username, user.displayAvatarURL({ dynamic: true, format: 'png' }))
    .setDescription("This is the user information:")
    .setColor("#ffa500")
    .addField("Full Name", message.author.tag)
    .addField("ID", message.author.id)
    .addField("Created at: ", message.author.createdAt);

   return message.channel.send(infoEmbed);
};
module.exports.info = {
  name: "userinfo",
  description: "Gives information about a user",
  expectedArgs: '[@User]'
};
