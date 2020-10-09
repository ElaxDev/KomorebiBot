const Discord = require('discord.js');
const { prefix, token } = require('./scripts/config.js').config;
console.log(`prefix: ${prefix}\ntoken: ${token}`);
const bot = new Discord.Client({
  disableEveryone: true
});

const data_manager = require('./scripts/managers/data_manager.js');
const message_manager = require('./scripts/managers/message_manager.js');
const command_finder = require('./scripts/command_finder.js');

var users_data = require("./resources/users_data.json");
var commands = command_finder.get_commands.commands;
var commandInfo = command_finder.get_commands.infos;

function run_command(bot, message, command, args, info) {
  if (!command.startsWith(prefix)) return;
  let commandName = command.replace(`${prefix}`, '');
  for (i = 0; i < Object.keys(commands).length; i++) {
    if (commands[commandName]) {
      let user = message.guild.member(message.author);
      let level = info[commandName].level;
      if (level != 3) {
        if (user.hasPermission("MANAGE_MESSAGES")) {
          commands[commandName].run(bot, message, args, info);
        } else {
          return message.reply(`**You don't have permission for this!**`);
        }
      } else {
        commands[commandName].run(bot, message, args, info);
      }
      break;
    }
  }
}

bot.on('ready', async () => {
  console.log(`${bot.user.username} bot is ready!`);
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  if (!users_data[message.author.id]) {
    data_manager.add_user(message.author.id);
  }

  message_manager.run(message);
  run_command(bot, message, command, args, commandInfo);
});

bot.login(token);
