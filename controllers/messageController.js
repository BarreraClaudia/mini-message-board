import { getMessage, addMessage } from '../models/db.js';
import { body, validationResult, matchedData } from 'express-validator';

const validateMessage = [
  body('messageUser')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isAlpha()
    .withMessage('Name must only contain alphabetic characters.')
    .isLength({ min: 1, max: 32 })
    .withMessage('Name must be between 1 and 32 characters.'),
  body('messageText')
    .trim()
    .notEmpty()
    .withMessage('Message is required.')
    .isLength({ max: 200 })
    .withMessage('Message cannot exceed 200 characters.'),
];

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

const postMessage = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('form', {
        errors: errors.array(),
        messageUser: req.body.messageUser,
        messageText: req.body.messageText,
      });
    }

    const { messageUser, messageText } = matchedData(req);
    await addMessage(messageUser, messageText);
    res.redirect('/');
  },
];

export { getMessageById, getMessageForm, postMessage };
