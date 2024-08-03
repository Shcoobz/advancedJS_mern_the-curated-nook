import express from 'express';
import { ENDPOINT } from '../config/common/constants.js';
import {
  createNewTonie,
  deleteTonie,
  getAllToniesInCollection,
  getTonieCollectionCount,
  getTonieWishlistCount,
  updateTonie,
} from '../controllers/toniesController.js';

const tonieRouter = express.Router();

tonieRouter
  .route(ENDPOINT.ROOT)
  .get(getAllToniesInCollection)
  .post(createNewTonie)
  .patch(updateTonie)
  .delete(deleteTonie);

tonieRouter.get('/count-collection', getTonieCollectionCount);
tonieRouter.get('/count-wishlist', getTonieWishlistCount);

export default tonieRouter;
