const Discord = module.require('discord.js');
const data_manager = require('../scripts/data_manager.js')
let users_data = require('../resources/users_data.json')

module.exports.run = async(message) => {
  if(!users_data[message.author.id]) {data_manager.add_user(message.author.id,[1,0,0])}

  let coinAmount = Math.floor(Math.random() * 15) + 1;
  let baseAmount = Math.floor(Math.random() * 15) + 1;
  if(coinAmount == baseAmount){users_data[message.author.id].Coins += coinAmount}

  let xpAdd = Math.floor(Math.random() * 7) + 8;


  let currentxp = users_data[message.author.id].Xp;
  let currentlevel = users_data[message.author.id].Level;
  let nextLevel = users_data[message.author.id].Level * 300;
  users_data[message.author.id].Xp = currentxp + xpAdd;


  if(nextLevel <= users_data[message.author.id].Xp) {
    users_data[message.author.id].Level = currentlevel + 1;
    let levelup = new Discord.RichEmbed()
    .setTitle("¡Acabas de subir de nivel!")
    .setColor("#ff00ff")
    .addField("Ahora eres nivel:", currentlevel + 1);
    return message.channel.send(levelup);
  }
  data_manager.save_file()
}
