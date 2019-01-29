const bot_config = require('./bot_config.json');
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const prefix = bot_config.prefix;
const fs = require('fs');
var commands = [];
var help = [];
let coins = require('./coins.json');
let users_data = require('./resources/users_data.json')
let xp = require('./xp.json')
const data_manager = require('./scripts/data_manager.js')
const webshot = require('./scripts/webshot.js')
webshot.get_image("prueba.html")

fs.readdir("./commands/", (error, files) => {
  if(error) console.error(error);

  let jsfiles = files.filter(file => file.split(".").pop() === "js");
  if(jsfiles.length <= 0) {
    console.log("No hay comandos para cagar!"); return;}

  console.log(`Cargando ${jsfiles.length} comandos!`);

  jsfiles.forEach((file, i) => {
      let props = require(`./commands/${file}`);
      console.log(`${i + 1}: ${file} cargado!`);
      commands.push([props.help.name, props]);
      help.push([props.help.name, props.help.usage])
  });
});

function run_command(bot, message, command, args, help){
  if(!command.startsWith(prefix)) return;
  for(i = 0; i < commands.length; i++){
    if(prefix+commands[i][0]===command){commands[i][1].run(bot, message, args, help); break;}
}}

bot.on('ready', async() => {console.log(`bot is ready! ${bot.user.username}`)})

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  if(!coins[message.author.id]) {
      coins[message.author.id] = {
        coins: 0
      };
  }

let coinAmount = Math.floor(Math.random() * 15) + 1;
let baseAmount = Math.floor(Math.random() * 15) + 1;

// if(coinAmount == baseAmount) {
  // user_coins = users_data[message.author.id].Coins + coinAmount

// }

let xpAdd = Math.floor(Math.random() * 7) + 8;

if(!users_data[message.author.id]) {
  data_manager.add_data(message.author.id,[1,0, baseAmount])

}

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


  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  data_manager.save_file()
  run_command(bot, message, command, args, help);
});

bot.login(bot_config.token);
