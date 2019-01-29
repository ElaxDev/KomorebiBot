const fs = require('fs')
var users_data = require('../resources/users_data.json');
module.exports.add_data = async (user_id, data) => {
  users_data[user_id] = {
    "Level" : data[0], "Xp": data[1],
    "Coins" : data[2]
  }
}
module.exports.save_file = async () => {
  fs.writeFile('./resources/users_data.json', JSON.stringify(users_data), (error) => {
    if(error) console.log(error);
  });
}
