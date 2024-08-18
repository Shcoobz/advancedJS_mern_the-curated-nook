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

const legoRouter = express.Router();

// Todo: do for all inventory items or make new get at /wishlist
function handleGetLego(req, res) {
  const { type } = req.query;

  if (type === 'wishlist') {
    return getAllLegoOnWishlist(req, res);
  }

  if (type === 'collection') {
    return getAllLegoInCollection(req, res);
  }
}

legoRouter
  .route(ENDPOINT.ROOT)
  .get(getAllLegoInCollection)
  .post(createNewLego)
  .patch(updateLego)
  .delete(deleteLego);

legoRouter.route('/wishlist').get(getAllLegoOnWishlist);

legoRouter.get('/count-collection', getLegoCollectionCount);
legoRouter.get('/count-wishlist', getLegoWishlistCount);

export default legoRouter;
