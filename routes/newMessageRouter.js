import { Router } from 'express';
import {
  getMessageForm,
  postMessage,
} from '../controllers/messageController.js';

const newMessageRouter = Router();

newMessageRouter.get('/', getMessageForm);

newMessageRouter.post('/', postMessage);

export default newMessageRouter;
