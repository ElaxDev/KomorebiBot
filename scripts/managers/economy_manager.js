const mongo = require('../mongo');
const profileSchema = require('../../schemas/profile-schema');

const coinsCache = {}

module.exports.addCoins = async (guildId, userId, amount) => {
  return await mongo().then(async mongoose => {
    try {
      let result = await profileSchema.findOneAndUpdate({
        guildId,
        userId
      }, {
        guildId,
        userId,
        $inc: {
          coins: amount
        }
      }, {
        upsert: true,
        new: true,
        useFindAndModify: false
      });
      coinsCache[`${guildId}-${userId}`] = result.coins;
      return result.coins

    } finally {
      mongoose.connection.close();
    }
  });
}

module.exports.getCoins = async(guildId, userId) => {
  const cachedValue = coinsCache[`${guildId}-${userId}`]
  if(cachedValue) return cachedValue;

  return await mongo().then(async mongoose => {
    try {
      let result = await profileSchema.findOne({
        guildId,
        userId
      });

      let coins = 0;
      if(result) {
        coins = result.coins;
      } else {
        await new profileSchema({
          guildId,
          userId,
          coins
        }).save();
      }

      coinsCache[`${guildId}-${userId}`] = coins;
      return coins;
    } finally {
      mongoose.connection.close();
    }
  });
};
