const pool = require('../db/db');

async function createPost(title,content,userId) {
    await pool.query (
        `INSERT INTO posts (title,content, user_id)
        VALUES ($1,$2,$3)`,
        [title,content, userId]
    );
}

module.exports = { createPost };