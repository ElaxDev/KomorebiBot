const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, help) => {
  let embed = new Discord.RichEmbed()
     .setAuthor(message.author.username)
     .setDescription("¡Esta es la informacion del usuario!")
     .setColor("#f02020")
     .addField("Nombre Completo", message.author.tag)
     .addField("ID", message.author.id)
     .addField("Creado en", message.author.createdAt);

   message.channel.send({embed: embed});
}
module.exports.config = {
  name: "userinfo",
  usage: "",
  level: 3
}
