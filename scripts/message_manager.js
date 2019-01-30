const Discord = module.require('discord.js');
const data_manager = require('../scripts/managers/data_manager.js')
const economy_manager = require('../scripts/managers/economy_manager.js')
const level_manager = require('../scripts/managers/level_manager.js')
let users_data = require('../resources/users_data.json')

module.exports.run = async(message) => {
  if(!users_data[message.author.id]) {data_manager.add_user(message.author.id)}
  economy_manager.run(message, 15)
  level_manager.run(message, 7, 300)
  data_manager.save_file()
}
