const Discord = module.require('discord.js');
const { prefix } = require('../scripts/config.js').config;

module.exports.run = async (bot, message, args, help) => {
 if(args[0]) {
   for(i = 0; i < help.length; i++) {
     if(args[0] == help[i][0]){
       let commandName = help[i][0];
       let commandUsage = help[i][1];

       let helpEmbed = new Discord.MessageEmbed()
       .setAuthor(message.author.username)
       .setColor("#ff6060")
       .addField("Comando:", `if.${commandName}`)
       .addField("Uso:", `${commandUsage}`);

       message.channel.send(helpEmbed);
       break;
     }
   }
 }
let commands = [];

 for(i = 0; i < help.length; i++) {
   commands.push(help[i][0]);
 }
 let helpEmbed = new Discord.MessageEmbed()
 .setAuthor(message.author.username, message.author.displayAvatarURL)
 .setColor("#ff6060")
 .addField("Lista de comandos:", `${commands.join("\n")}`)
 .setFooter(`Escribe "${prefix}help [comando]" para tener ayuda sobre un comando en específico.`);

 message.channel.send(helpEmbed);
};

module.exports.config = {
  name: "help",
  usage: `Shows the help for a command:\nhelp <command>`,
  level: 3
};
