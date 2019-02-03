const Discord = require("discord.js")

module.exports.run = async(bot, message, args, help) => {
  let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
  if (!member){message.channel.send("**No puedo encontrar al usuario!!** :/")}
  message.guild.member(member).ban(args[1]);

  let ban_rason = args.slice(1).join(" ");
  console.log(ban_rason.replace(" "))
  if (ban_rason.replace(" ","")!= ""){
    message.channel.send("**"+member.user.username+" fue baneado, razon: "+ban_rason+"!!**")
  } else {message.channel.send("**"+member.user.username+" fue baneado!!**")}
}
module.exports.config = {
  name: "ban",
  usage: "",
  level: 1
}
