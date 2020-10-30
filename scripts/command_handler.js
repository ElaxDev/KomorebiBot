const { readdirSync } = require('fs');
const { MessageEmbed } = require('discord.js');
const cliProgress = require('cli-progress');
const path = require('path');
const colors = require('colors');
const commandsPath = path.join(__dirname, '..', 'commands', '\\');

function hasPermission(command, user) {
  let { permissions = [] } = command.info;

  if (permissions.length == 0) {
    return true
  } else {
    for (permission of permissions) {
      if (!user.hasPermission(permission)) {
        return false;
      }
    }
    return true;
  }
};

/*[TODO]: CLASSIFY COMMANDS IN CATEGORIES EACH COMMAND
IN A DIFFERENT CATEGORY ACCORDING TO THE FOLDER*/
module.exports.loadCommands = (commandsCollection) => {
  var progress = new cliProgress.SingleBar({
    format: 'Loading commands... |' + colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || {file}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
  });
  let totalProgress = 0;
  let failedFiles = [];
  progress.start(totalProgress, 0, {
    file: "N/A"
  });
  readdirSync(commandsPath).forEach(dir => {
    let commands = readdirSync(`${commandsPath}\\${dir}`).filter(file => file.endsWith('.js'));
    totalProgress += commands.length;
    progress.setTotal(totalProgress);
    for(let file of commands) {
      try {
        let cmd = require(`${commandsPath}\\${dir}\\${file}`);
        commandsCollection.set(cmd.info.name, cmd);
        
      } catch (err) {
        failedFiles.push(file);
      }
      progress.increment();
      progress.update( {
        file: file
      });
    }
  });
  progress.stop();
  if(failedFiles.length) {
    console.log(`${failedFiles.length} command failed to load: `.red.bold + 
    `${failedFiles.join(', ').yellow}`);
  }
};

module.exports.runCommand = (command, user, message, bot, args) => {
  if (hasPermission(command, user)) {
    return command.run(message, bot, args);
  } else {
    permissionEmbed = new MessageEmbed()
    .setTitle('Insufficient Permissions!')
    .setDescription('You do not have permission to run this command.')
    .setColor('#ff1c1c');
    return message.channel.send(permissionEmbed);
  }
};
