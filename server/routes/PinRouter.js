import { Router } from 'express';

import { createPin, getPins } from '../controllers/Pin.js';
import auth from '../middleware/auth.js';


const pinRouter = Router();
pinRouter.post('/', auth, createPin);
pinRouter.get('/' , getPins)

export default pinRouter;