import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBookById } from '../../api/booksApiSlice';

import Spinner from '../../../../../components/common/Spinner';
import EditBookForm from './EditBookForm';

function EditBook() {
  const { id } = useParams();

  const book = useSelector((state) => selectBookById(state, id));

  const content = book ? <EditBookForm book={book} /> : <Spinner />;

  return content;
}

export default EditBook;
