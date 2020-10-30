const { MessageEmbed } = require('discord.js');
const mongo = require('../mongo');
const profileSchema = require('../../schemas/profile-schema');

module.exports = async message => {
  const { guild, author } = message;
  randXP = Math.floor(Math.random() * 4);
  addXP(guild.id, author.id, randXP, message);
};

const getNeededXP = level => level * ((level/2) * 100);

async function addXP(guildId, userId, xpToAdd, message) {
  await mongo().then(async mongoose => {
    try {
      const result = await profileSchema.findOneAndUpdate({
        guildId,
        userId
      }, {
        guildId,
        userId,
        $inc: {
          xp: xpToAdd
        }
      }, {
        upsert: true,
        new: true,
        useFindAndModify: false
      })
      let { xp, level } = result;
      let xpNeeded = getNeededXP(level);

      if(xp >= xpNeeded) {
        let user = message.author;
        ++level;
        xp -=xpNeeded;

        let levelUpEmbed = new MessageEmbed()
        .setAuthor(user.username, user.displayAvatarURL({ dynamic: true, format: 'png'}))
        .setTitle("You just leveled up!")
        .setColor("#ff00ff")
        .addField("You are now level: ", level)
        .setTimestamp();
        message.channel.send(levelUpEmbed);

        await profileSchema.updateOne({
          guildId,
          userId
        }, {
          level,
          xp
        });
      }
      
    } finally {
      mongoose.connection.close();
    }
  });
};

module.exports.getXP = async (guildId, userId) => {
  return await mongo().then(async mongoose => {
    try {
      let xpObj;

      let result = await profileSchema.findOne({
        guildId,
        userId
      });

      if(result) {
        xpObj = {
          xp: result.xp,
          level: result.level
        };
      } else {
        xpObj = {
          xp: 0,
          level: 1
        };
      }
      return xpObj;
    } finally {
      mongoose.connection.close();
    }
  });
};

module.exports.getNeededXP = getNeededXP;
