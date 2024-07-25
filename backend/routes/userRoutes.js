import express from 'express';
import { ENDPOINT } from '../config/common/constants.js';
import {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} from '../controllers/usersController.js';

const userRouter = express.Router();

userRouter
  .route(ENDPOINT.ROOT)
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser);

export default userRouter;
