const Discord = require("discord.js")

module.exports.run = async(bot, message, args, help) => {
  let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
  if (!member){message.channel.send("**No puedo encontrar al usuario!!** :/")}
  message.guild.member(member).kick(args[1]);

  let kick_rason = args.slice(1).join(" ");
  console.log(kick_rason.replace(" "))
  if (kick_rason.replace(" ","")!= ""){
    message.channel.send("**"+member.user.username+" fue kickeado, razon: "+kick_rason+"!!**")
  } else {message.channel.send("**"+member.user.username+" fue kickeado!!**")}
}
module.exports.config = {
  name: "kick",
  usage: "",
  level: 2
}
