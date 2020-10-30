const dotenv = require('dotenv/config');

module.exports = {
    prefix: process.env.PREFIX,
    token: process.env.TOKEN,
    mongoPath: `${process.env.MONGO_PATH}/KomorebiBot`
};