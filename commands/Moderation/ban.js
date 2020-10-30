
module.exports.run = async(message, bot, args, help) => {
  let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!member){
    message.channel.send("**I can't find the user!**");
}
  message.guild.member(member).ban(args[1]);

  let ban_reason = args.slice(1).join(" ");
  if (ban_reason.replace(" ","")!= ""){
    message.channel.send("**"+member.user.username+" was banned\nreason: "+ban_reason+"**");
  } else {
    message.channel.send("**"+member.user.username+" was banned**");
}
};
module.exports.info = {
  name: 'ban',
  description: 'Bans a user from the server',
  expectedArgs: '<User> [Reason]',
  permissions: ['BAN_MEMBERS']
};
