
module.exports.run = async (message, bot, args, help) => {
  let guild = message.guild;
  let member = message.member;
  let role_tag;
  if (args.length === 1){
    role_tag = args.join(" ");
  } else if (args.length === 2){
    member = message.mentions.members.first();
    role_tag = args.slice(1).join(" ");
  } else {
    return message.reply('You need to specify a member to give the role to!');
  }

  let role = await guild.roles.cache.find(role => role.name === role_tag);
  let memberRole = await member.roles.cache.find(role => role.name === role_tag);
  if(role === undefined || role === null){
    return message.reply(`**There is no role named ${role_tag}!**`);    
  } else {
    if(memberRole !== undefined){
      return message.reply(`**The user already have the role ${role_tag}!**`);
    } else {
      member.roles.add(role).then(() => {
        message.reply(`**${role_tag} role assigned sucessfully!**`);
      }).catch(() => message.channel.send(`**I don't have the permissions to do that!**`));
    }
  }
};

module.exports.info = {
  name: 'giverole',
  description: 'Gives a role to a user',
  expectedArgs: '<User>',
  permissions: ['MANAGE_ROLES']
};
