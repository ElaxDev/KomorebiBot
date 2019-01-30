const fs = require('fs')
var users_data = require('../../resources/users_data.json');
module.exports.add_user = async (user_id) => {
  users_data[user_id] = {
    "Level" : 1, "Xp": 0,
    "Coins" : 0
  }
}
module.exports.save_file = async () => {
  fs.writeFile('./resources/users_data.json', JSON.stringify(users_data), (error) => {
    if(error) console.log(error);
  });
}
