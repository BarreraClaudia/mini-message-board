import { getMessage, addMessage } from '../models/db.js';

async function getMessageById(req, res) {
  const message = await getMessage(req.params.id);
  if (!message) {
    return res.status(404).send('Message not found');
  }
  res.render('message', { message: message });
}

function getMessageForm(req, res) {
  res.render('form');
}

async function createMessage(req, res) {
  const { messageUser, messageText } = req.body;
  await addMessage(messageUser, messageText);
  res.redirect('/');
}

export { getMessageById, getMessageForm, createMessage };
