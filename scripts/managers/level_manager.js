const Discord = module.require('discord.js');
let users_data = require('../../resources/users_data.json');
module.exports.run = async(message, xp_mod, level_mod) => {
  let xp_gained = Math.floor(Math.random() * xp_mod) + 8;
  let next_level = users_data[message.author.id].Level * level_mod;
  users_data[message.author.id].Xp += xp_gained;

  if(next_level <= users_data[message.author.id].Xp) {
    users_data[message.author.id].Level += 1;
    let level_up = new Discord.RichEmbed()
    .setTitle("¡Acabas de subir de nivel!")
    .setColor("#ff00ff")
    .addField("Ahora eres nivel:", users_data[message.author.id].Level + 1);
    return message.channel.send(level_up);
  }
}
