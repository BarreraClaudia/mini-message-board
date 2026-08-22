import { getMessages } from '../models/db.js';

async function getIndex(req, res) {
  const messages = await getMessages();
  res.render('index', { messages: messages });
}

export { getIndex };
