const pool = require('../db/db');

async function findByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username=$1',[username]);
    return result.rows[0];
}

async function createUser(firstName, lastName, username, passwordHash) {
    await pool.query(`INSERT INTO users (first_name, last_name, username, password_hash)
        VALUES ($1, $2, $3, $4)`, 
        [firstName, lastName, username, passwordHash]);
}

async function setMemberStatus(userId, isMember) {
    await pool.query(`UPDATE users SET is_member=$1 WHERE id=$2`, [isMember, userId]);
}



module.exports = {
    findByUsername,
    createUser,
    setMemberStatus,
};