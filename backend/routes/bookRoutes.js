import express from 'express';
import { ENDPOINT } from '../config/common/constants.js';
import {
  createNewBook,
  deleteBook,
  getAllBooksInCollection,
  getAllBooksOnWishlist,
  getBookCount,
  updateBook,
} from '../controllers/booksController.js';

const bookRouter = express.Router();

// Todo: do for all inventory items
function handleGetBooks(req, res) {
  const { type } = req.query;

  if (type === 'wishlist') {
    return getAllBooksOnWishlist(req, res);
  }

  if (type === 'collection') {
    return getAllBooksInCollection(req, res);
  }
}

bookRouter
  .route(ENDPOINT.ROOT)
  .get(getAllBooksInCollection)
  .post(createNewBook)
  .patch(updateBook)
  .delete(deleteBook);

bookRouter.get('/count', getBookCount);

export default bookRouter;
