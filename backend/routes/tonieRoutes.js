import express from 'express';
import { ENDPOINT } from '../config/common/constants.js';
import {
  createNewTonie,
  deleteTonie,
  getAllToniesInCollection,
  updateTonie,
} from '../controllers/toniesController.js';

const tonieRouter = express.Router();

tonieRouter
  .route(ENDPOINT.ROOT)
  .get(getAllToniesInCollection)
  .post(createNewTonie)
  .patch(updateTonie)
  .delete(deleteTonie);

export default tonieRouter;
