import express from 'express';
import { ENDPOINT } from '../config/common/constants.js';
import {
  createNewBook,
  deleteBook,
  getAllBooksInCollection,
  getAllBooksOnWishlist,
  getBookCollectionCount,
  getBookWishlistCount,
  updateBook,
} from '../controllers/booksController.js';

const bookRouter = express.Router();

bookRouter
  .route(ENDPOINT.ROOT)
  .get(getAllBooksInCollection)
  .post(createNewBook)
  .patch(updateBook)
  .delete(deleteBook);

bookRouter.route('/wishlist').get(getAllBooksOnWishlist);

bookRouter.get('/count-collection', getBookCollectionCount);
bookRouter.get('/count-wishlist', getBookWishlistCount);

export default bookRouter;
