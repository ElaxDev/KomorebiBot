const { Schema, model } = require('mongoose');

const reqString = {
  type: String,
  required: true
}

const profileSchema = Schema({
  guildId: reqString,
  userId: reqString,
  coins: {
    type: Number,
    default: 0
  },
  xp: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  }
});

module.exports = model('profiles', profileSchema);
