const bot_config = require('./bot_config.json');
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const prefix = bot_config.prefix;
const fs = require('fs');
var commands = [];
let coins = require('./coins.json');
let xp = require('./xp.json')

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
  });
});

function run_command(bot, message, command, args){
  if(!command.startsWith(prefix)) return;
  for(i = 0; i < commands.length; i++){
    if(prefix+commands[i][0]===command){commands[i][1].run(bot, message, args); break;}
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

if(coinAmount == baseAmount) {
  coins[message.author.id] = {
    coins: coins[message.author.id].coins + coinAmount
  };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if(err) console.log(err)
  });
}

let xpAdd = Math.floor(Math.random() * 7) + 8;

if(!xp[message.author.id]) {
  xp[message.author.id] = {
    xp:0,
    level: 1
  };
}

let currentxp = xp[message.author.id].xp;
let currentlevel = xp[message.author.id].level;
let nextLevel = xp[message.author.id].level * 300;
xp[message.author.id].xp = currentxp + xpAdd;


if(nextLevel <= xp[message.author.id].xp) {
  xp[message.author.id].level = currentlevel + 1;
  let levelup = new Discord.RichEmbed()
  .setTitle("¡Acabas de subir de nivel!")
  .setColor("#ff00ff")
  .addField("Ahora eres nivel:", currentlevel + 1);
  return message.channel.send(levelup);
}

fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
  if(err) console.log(err);
});

  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  run_command(bot, message, command, args);
});

bot.login(bot_config.token);
