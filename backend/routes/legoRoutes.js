import express from 'express';
import { ENDPOINT } from '../config/common/constants.js';
import {
  createNewLego,
  deleteLego,
  getAllLegoInCollection,
  getAllLegoOnWishlist,
  getLegoCollectionCount,
  getLegoWishlistCount,
  updateLego,
} from '../controllers/legoController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const legoRouter = express.Router();

legoRouter.use(verifyJWT);

legoRouter
  .route(ENDPOINT.ROOT)
  .get(getAllLegoInCollection)
  .post(createNewLego)
  .patch(updateLego)
  .delete(deleteLego);

legoRouter.route('/wishlist').get(getAllLegoOnWishlist);

legoRouter.route('/count-collection').get(getLegoCollectionCount);
legoRouter.route('/count-wishlist').get(getLegoWishlistCount);

export default legoRouter;
