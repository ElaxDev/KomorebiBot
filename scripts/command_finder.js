const fs = require('fs');
var commands = {};
var infos = {};
fs.readdir("./commands/", (error, files) => {
  if(error) console.error(error);
  let jsfiles = files.filter(file => file.split(".").pop() === "js");

  if(jsfiles.length <= 0) {
    console.log("There are no commands to load!"); return;}
  console.log(`Loading ${jsfiles.length} commands!`);

  jsfiles.forEach((file, i) => {
      let command = require(`../commands/${file}`);
      console.log(`${i + 1}: ${file} loaded!`);
      commands[command.config.name] = command;
      infos[command.config.name] = {
        description: command.config.description,
        usage: command.config.usage,
        category: command.config.category,
        level: command.config.level
      };
  });
});

module.exports.get_commands = {
  commands : commands,
  infos: infos
};
