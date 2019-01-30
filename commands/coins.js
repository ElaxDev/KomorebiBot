const Discord = module.require('discord.js');
const data_manager = require('../scripts/managers/data_manager.js')
let users_data = require('../resources/users_data.json');

module.exports.run = async (bot, message, args, help) => {
  if (args[0]) {
    const user = message.mentions.members.first().user;
    let id = user.id
    if (!user) return message.reply("Por favor, use una mención válida si quiere ver el balance de alguien más.");
    if (id.startsWith("<@")) {
      let id = id.slice(-1, 2);
    }
    let userCoins = users_data[id].Coins;
    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(`${user.username} 💵`, message.author.displayAvatarURL)
    .setColor("#ffff00")
    .addField("Balance:", `${user.username} tiene ${userCoins} monedas!`);

    return message.channel.send(coinEmbed)
  }
  let userCoins = users_data[message.author.id].Coins;

  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(`${message.author.username} 💵`)
  .setColor("#ffff00")
  .addField("Balance:", `Tienes ${userCoins} monedas!`);

  message.channel.send(coinEmbed)
}

module.exports.help = {
  name: "coins",
  usage: "if.coins [Usuario del que quieres ver las monedas]"
}
