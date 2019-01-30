let users_data = require('../../resources/users_data.json');
module.exports.run = async(message, coin_mod) => {
  let coin_amount = Math.floor(Math.random() * coin_mod) + 1;
  let base_amount = Math.floor(Math.random() * coin_mod) + 1;
  if(coin_amount == base_amount){
    users_data[message.author.id].Coins += coin_amount
  }
}
