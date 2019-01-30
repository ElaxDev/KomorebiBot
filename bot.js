const Discord = require('discord.js');

const bot_config = require('./bot_config.json');
const bot = new Discord.Client({disableEveryone: true});
const prefix = bot_config.prefix;

const data_manager = require('./scripts/managers/data_manager.js')
const message_manager = require('./scripts/message_manager.js')
const command_finder = require('./scripts/command_finder.js')
// const webshot = require('./scripts/webshot.js')
// webshot.get_image("prueba.html")
let users_data = require("./resources/users_data.json");
var commands = command_finder.get_commands["commands"];
var helps = command_finder.get_commands["helps"];

function run_command(bot, message, command, args, helps){
  if(!command.startsWith(prefix)) return;
  for(i = 0; i < commands.length; i++){
    if(prefix+commands[i][0]===command){commands[i][1].run(bot, message, args, helps); break;}
}}

bot.on('ready', async() => {console.log(`bot is ready! ${bot.user.username}`)})

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  if (!users_data[message.author.id]){data_manager.add_user(message.author.id)}
  
  message_manager.run(message)
  run_command(bot, message, command, args, helps);
});

bot.login(bot_config.token);
