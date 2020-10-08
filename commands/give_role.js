
module.exports.run = async (bot, message, args, help) => {
  let guild = message.guild;
  let member = message.member;
  let role_tag;
  if (args.length === 1){
    role_tag = args.join(" ");
  } else if (args.length === 2){
    member = message.mentions.members.first();
    role_tag = args.slice(1).join(" ");
  } else {
    return message.reply('You need to specify at least an argument!');
  }

  let role = await guild.roles.cache.find(role => role.name === role_tag);
  let memberRole = await member.roles.cache.find(role => role.name === role_tag);
  if(role === undefined || role === null){
    return message.reply(`**There is no role named ${role_tag}!**`);    
  } else {
    if(memberRole !== undefined){
      return message.reply(`**You already have the role ${role_tag}!**`);
    } else {
      member.roles.add(role).then(() => {
        message.reply(`**Congrats!! You got the role ${role_tag}.**`);
      }).catch(() => message.channel.send(`**I don't have the permissions to do that!**`));
    }
  }
};

module.exports.config = {
  name: "give_role",
  usage: `Gives a role to a user:\ngive_role <role name> [user]`,
  level: 3
};
