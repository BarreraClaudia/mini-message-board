import { Router } from 'express';
import { getMessageById } from '../controllers/messageController.js';

const messageRouter = Router();

messageRouter.get('/:id', getMessageById);

export default messageRouter;
