const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (args.length === 1){
    var user = message.guild.member(message.author);
    var role_tag = args.join(" ");
  } else if (args.length === 2){
    var user = message.mentions.members.first();
    var role_tag = args.slice(1).join(" ");
  } else {return message.reply(`**Syntax Error!**`)}
  let role = message.guild.roles.find(`name`, role_tag);
  if(!role){return message.reply(`**There is not role ${role_tag}!**`);
  } else {
    if(user.roles.has(role.id)){return message.reply(`**You already have the role ${role_tag}!**`)
    } else {
      user.addRole(role.id).then(() => {
        message.reply(`**Congrats!! You got the role ${role_tag}.**`)
      }).catch(() => message.channel.send(`**I don't have the permissions to do that!**`))
    }
  }
}
module.exports.help = {
  name: "give_rol"
}
