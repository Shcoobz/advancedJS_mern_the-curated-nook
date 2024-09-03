import getBookFormFields from '../../../../../data/bookFormData';
import EntityFormNewTable from '../../../../entity/components/EntityNew/EntityFormNewTable';

function BookFormNewTable(props) {
  return (
    <EntityFormNewTable
      entityType='Book'
      getFormFields={getBookFormFields}
      titleField='title'
      {...props}
    />
  );
}

export default BookFormNewTable;
