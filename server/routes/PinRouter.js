import { Router } from 'express';

import {
  createPin,
  deletePin,
  getPins,
  updatePin,
} from '../controllers/Pin.js';
import auth from '../middleware/auth.js';
import checkAccess from '../middleware/checkAccess.js';
import pinPermissions from '../middleware/permissions/pin/pinPermissions.js';


const pinRouter = Router();
pinRouter.post('/', auth, createPin);
pinRouter.get('/', getPins);
pinRouter.delete(
  '/:pinId',
  auth,
  checkAccess(pinPermissions.delete),
  deletePin
);
pinRouter.patch(
  '/:pinId',
  auth,
  checkAccess(pinPermissions.update),
  updatePin
);
export default pinRouter;