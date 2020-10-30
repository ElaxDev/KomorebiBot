
module.exports.run = async(message, bot, args) => {
  let member = await message.guild.member(message.mentions.users.first() || message.guild.members.cache.find(member => member.username === args[0]));
  if (!member){
    return message.reply(`I can't find that user!`);
  }
  let kick_reason = args.slice(1).join(" ");
  try {
    await member.kick(args[1]);
  } catch (error) {
    return message.reply(`You can't kick that user!`);
  }

  if (kick_reason.replace(" ","")!= ""){
    message.channel.send("**"+member.user.username+" was kicked\nreason: "+kick_reason+"**");
  } else {
    message.channel.send("**"+member.user.username+" was kicked **");
}
};
module.exports.info = {
  name: 'kick',
  description: 'Kicks a user off the server',
  expectedArgs: '<User> [Reason]',
  permissions: ['KICK_MEMBERS']
};
