const { MessageEmbed } = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!args[0]) {
    let infoEmbed = new MessageEmbed()
     .setAuthor(message.author.username)
     .setDescription("This is the user information:")
     .setColor("")
     .addField("Full Name", message.author.tag)
     .addField("ID", message.author.id)
     .addField("Created at: ", message.author.createdAt);

   return message.channel.send(infoEmbed);
  } 
  let user = message.mentions.users.first() || message.guild.members.get(args[0]);
  if(!user) return message.channel.send({
    embed: {
      color: 15736864,
      description: 'You need to mention a valid user!'
    }
  });
  let infoEmbed = new MessageEmbed()
     .setAuthor(user.username)
     .setDescription("This is the user information:")
     .setColor("")
     .addField("Full Name", user.tag)
     .addField("ID", user.id)
     .addField("Created at: ", user.createdAt);
};
module.exports.config = {
  name: "userinfo",
  description: "Gives information about a user",
  usage: "userinfo [@user]",
  category: "Utility",
  level: 3
};
