// const economy_manager = require('./economy_manager.js');
const level_manager = require('./level_manager.js');

module.exports.run = async message => {
  level_manager(message);
};
