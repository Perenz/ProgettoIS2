const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.WWW_PORT,
    mongo: {
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        db: process.env.MONGO_DB,
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
    },
};