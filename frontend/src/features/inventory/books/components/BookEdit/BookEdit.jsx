import { useGetBooksQuery } from '../../api/booksApiSlice';
import BookFormEdit from './BookFormEdit';
import EntityEdit from '../../../../entity/Components/EntityEdit/EntityEdit';

function BookEdit() {
  return (
    <EntityEdit
      useGetQuery={useGetBooksQuery}
      queryName='booksList'
      EntityFormEdit={BookFormEdit}
      entityName='book'
    />
  );
}

export default BookEdit;
