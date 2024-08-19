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
import verifyJWT from '../middleware/verifyJWT.js';

const bookRouter = express.Router();

bookRouter.use(verifyJWT);

bookRouter
  .route(ENDPOINT.ROOT)
  .get(getAllBooksInCollection)
  .post(createNewBook)
  .patch(updateBook)
  .delete(deleteBook);

bookRouter.route('/wishlist').get(getAllBooksOnWishlist);

bookRouter.route('/count-collection').get(getBookCollectionCount);
bookRouter.route('/count-wishlist').get(getBookWishlistCount);

export default bookRouter;
