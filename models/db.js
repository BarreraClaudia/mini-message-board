const messages = [
  {
    user: 'Dania',
    text: 'Hi everyone!',
    added: new Date(),
  },
  {
    user: 'Leslie',
    text: 'Hello world!',
    added: new Date(),
  },
  {
    user: 'Alyn',
    text: 'Howdy!',
    added: new Date(),
  },
];

async function getMessages() {
  return messages;
}

// Using the array index as the id is fine for a fake db like this. Just know it's fragile (ids shift if you ever delete messages). For a real db you'd use a proper unique id instead.
async function getMessage(id) {
  return messages[id];
}

async function addMessage(user, text) {
  const message = { user, text, added: new Date() };
  messages.push(message);
  return message;
}

export { getMessages, getMessage, addMessage };
