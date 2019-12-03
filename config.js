const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.WWW_PORT,
    mongo: process.env.MONGODB_URI,
};