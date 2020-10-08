const fs = require('fs');
var commands = [];
var helps = [];
var levels = {};
fs.readdir("./commands/", (error, files) => {
  if(error) console.error(error);
  let jsfiles = files.filter(file => file.split(".").pop() === "js");

  if(jsfiles.length <= 0) {
    console.log("No hay comandos para cagar!"); return;}
  console.log(`Cargando ${jsfiles.length} comandos!`);

  jsfiles.forEach((file, i) => {
      let props = require(`../commands/${file}`);
      console.log(`${i + 1}: ${file} cargado!`);
      commands.push([props.config.name, props]);
      helps.push([props.config.name, props.config.usage]);
      levels[props.config.name] = props.config.level;
  });
});
module.exports.get_commands = {
  "commands" : commands,
  "helps" : helps,
  "levels" : levels
};
