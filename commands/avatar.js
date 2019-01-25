const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {

  let msg = await message.channel.send("Generando avatar...");
  if (args[0]) {
    const user = message.mentions.members.first().user;
    if (!user) {
      msg.delete();
      return message.reply("Por favor, use una mención válida si quiere ver el avatar de alguien más.");
    }
    await message.channel.send({files: [
      {
        attachment: user.displayAvatarURL,
        name: "avatar.png"
      }
    ]});
    msg.delete();
    return;
  }
  await message.channel.send({files: [
    {
      attachment: message.author.displayAvatarURL,
      name: "avatar.png"
    }
  ]});

    msg.delete();
}
module.exports.help = {
  name: "avatar"
}
