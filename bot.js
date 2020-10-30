const { Client, Collection } = require('discord.js');
const { prefix, token } = require('./scripts/config.js');
const mongo = require('./scripts/mongo');
const bot = new Client({
  disableEveryone: true
});
bot.prefix = prefix;

const message_manager = require('./scripts/managers/message_manager.js');
const command_handler = require('./scripts/command_handler.js');

bot.commands = new Collection();
command_handler.loadCommands(bot.commands);

function run_command(message, bot, commandName, args) {
    if (bot.commands.has(commandName)) {
      let command = bot.commands.get(commandName);
      let user = message.guild.member(message.author);
      command_handler.runCommand(command, user, message, bot, args);
  }
}

bot.on('ready', async () => {
  bot.user.setActivity(`Type ${prefix}help for help!`);
  await mongo().then(mongoose => {
    try {
      console.log('Database connected!');
    } finally {
      mongoose.connection.close();
    }
  });
  console.log(`${bot.user.username} bot is ready!`);
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  message_manager.run(message);
  if (!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase().replace(`${prefix}`, '');
  let args = messageArray.slice(1);

  run_command(message, bot, command, args);
});

bot.login(token);