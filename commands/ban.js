
module.exports.run = async(bot, message, args, help) => {
  let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!member){
    message.channel.send("**No puedo encontrar al usuario!!** :/");
}
  message.guild.member(member).ban(args[1]);

  let ban_reason = args.slice(1).join(" ");
  console.log(ban_reason.replace(" "));
  if (ban_reason.replace(" ","")!= ""){
    message.channel.send("**"+member.user.username+" was banned\nreason: "+ban_reason+"**");
  } else {
    message.channel.send("**"+member.user.username+" was banned**");
}
};
module.exports.config = {
  name: "ban",
  usage: "",
  level: 1
};
