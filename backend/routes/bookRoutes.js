import express from 'express';
import { ENDPOINT } from '../config/common/constants.js';
import {
  createNewBook,
  deleteBook,
  getAllBooksInCollection,
  updateBook,
} from '../controllers/booksController.js';

const bookRouter = express.Router();

bookRouter
  .route(ENDPOINT.ROOT)
  .get(getAllBooksInCollection)
  .post(createNewBook)
  .patch(updateBook)
  .delete(deleteBook);

export default bookRouter;
