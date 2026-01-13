require('dotenv').config();
const {Pool} = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const pool = process.env.DATABASE_URL ?
    new Pool ({
        connectionString: process.env.DATABASE_URL,
        ssl: isProduction ? { rejectUnauthorized: false } : false,
    }) :
    new Pool({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD || undefined,
        database:process.env.DB_NAME,
        port: Number(process.env.DB_PORT)
});

module.exports = pool;