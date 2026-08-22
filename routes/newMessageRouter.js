import { Router } from 'express';
import {
  getMessageForm,
  createMessage,
} from '../controllers/messageController.js';

const newMessageRouter = Router();

newMessageRouter.get('/', getMessageForm);

newMessageRouter.post('/', createMessage);

export default newMessageRouter;
