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
var configs = {
  "helps": command_finder.get_commands.helps,
  "levels": command_finder.get_commands.levels
};

function run_command(bot, message, command, args, configs) {
  if (!command.startsWith(prefix)) return;
  for (i = 0; i < commands.length; i++) {
    if (prefix + commands[i][0] === command) {
      let user = message.guild.member(message.author);
      let level = configs.levels[configs.helps[i][0]];
      if (level != 3) {
        if (user.hasPermission("MANAGE_MESSAGES")) {
          commands[i][1].run(bot, message, args, configs.helps);
        } else {
          return message.reply(`**No tienes permiso para esto!!**`);
        }
      } else {
        commands[i][1].run(bot, message, args, configs.helps);
      }
      break;
    }
  }
}

bot.on('ready', async () => {
  console.log(`bot is ready! ${bot.user.username}`);
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
  run_command(bot, message, command, args, configs);
});

bot.login(token);
