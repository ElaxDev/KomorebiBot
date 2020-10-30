const { MessageEmbed } = require('discord.js');

module.exports.run = async (message, bot) => {

  message.channel.send('Pinging... 🏓')
  .then(async sentMessage => {
    let botPing = sentMessage.createdTimestamp - message.createdTimestamp;
    let pingEmbed = new MessageEmbed()
      .setTitle('🏓 Pong!')
      .addField('Bot Latency', `${Math.floor(botPing)}ms`)
      .addField('API Latency', `${Math.round(bot.ws.ping)}ms`);
    await sentMessage.delete();
    message.channel.send(pingEmbed);
  });

};
module.exports.info = {
  name: "ping",
  description: "Checks the bot's and the api's latency",
  expectedArgs: undefined
};
