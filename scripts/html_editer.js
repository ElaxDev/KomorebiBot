const bot_config = require("../bot_config.json");
module.exports.write_tag = async (label, body) => {
  var tag = "<"+label+">"+body+"</"+label+">"; return tag;}

module.exports.write_imgtag = async (file) => {
  var tag = "<img src='"+bot_config.sources_dic+file+"'>"; return tag;}
