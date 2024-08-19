import express from 'express';
import { ENDPOINT } from '../config/common/constants.js';
import {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUserCount,
} from '../controllers/usersController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const userRouter = express.Router();

userRouter.use(verifyJWT);

userRouter
  .route(ENDPOINT.ROOT)
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route('/count').get(getUserCount);

export default userRouter;
