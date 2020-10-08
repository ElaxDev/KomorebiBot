
module.exports.run = async(bot, message, args, help) => {
  let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!member){
    message.channel.send("**No puedo encontrar al usuario!!** :/");
}
  message.guild.member(member).kick(args[1]);

  let kick_reason = args.slice(1).join(" ");
  console.log(kick_reason.replace(" "));
  if (kick_reason.replace(" ","")!= ""){
    message.channel.send("**"+member.user.username+" was kicked\nreason: "+kick_reason+"**");
  } else {
    message.channel.send("**"+member.user.username+" was kicked **");
}
};
module.exports.config = {
  name: "kick",
  usage: "",
  level: 2
};
