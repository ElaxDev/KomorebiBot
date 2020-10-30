const { MessageAttachment } = require("discord.js");
const { Rank } = require("canvacord");
const { getXP, getNeededXP } = require('../../scripts/managers/level_manager');

module.exports.run = async message => {
  const user = message.mentions.users.first() || message.author;
  const { xp, level } = await getXP(message.channel.guild.id, user.id);
  console.log( `level: ${level}\nxp: ${xp}`);
  const rank = new Rank()
  .setAvatar(user.displayAvatarURL({dynamic: true, format: 'png'}))
  .setCurrentXP(xp)
  .setLevel(level)
  .setRequiredXP(getNeededXP(level))
  .setProgressBar("#EEEE", "COLOR")
  .setUsername(user.username)
  .setDiscriminator(user.discriminator)
  .setRank(1,'',false);
  rank.build().then(data => {
    const attachment = new MessageAttachment(data, "RankCard.png");
    message.channel.send(attachment);
  })
};

module.exports.info = {
  name: "level",
  description: "Shows yours or a user's current level",
  expectedArgs: "[@User]"
};
