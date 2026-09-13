import pool from './pool.js';

async function getAllMessages() {
  const { rows } = await pool.query('SELECT * FROM messages');
  return rows;
}

async function getMessage(id) {
  const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [
    id,
  ]);
  return rows[0];
}

async function insertMessage(name, message) {
  await pool.query('INSERT INTO messages (name, message) VALUES ($1, $2)', [
    name,
    message,
  ]);
}

export { getAllMessages, getMessage, insertMessage };
