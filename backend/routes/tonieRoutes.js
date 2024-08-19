import express from 'express';
import { ENDPOINT } from '../config/common/constants.js';
import {
  createNewTonie,
  deleteTonie,
  getAllToniesInCollection,
  getAllToniesOnWishlist,
  getTonieCollectionCount,
  getTonieWishlistCount,
  updateTonie,
} from '../controllers/toniesController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const tonieRouter = express.Router();

tonieRouter.use(verifyJWT);

tonieRouter
  .route(ENDPOINT.ROOT)
  .get(getAllToniesInCollection)
  .post(createNewTonie)
  .patch(updateTonie)
  .delete(deleteTonie);

tonieRouter.route('/wishlist').get(getAllToniesOnWishlist);

tonieRouter.route('/count-collection').get(getTonieCollectionCount);

tonieRouter.route('/count-wishlist').get(getTonieWishlistCount);

export default tonieRouter;
