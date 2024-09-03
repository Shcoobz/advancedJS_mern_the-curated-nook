import EntityFormNewTable from '../../../../entity/Components/EntityNew/EntityFormNewTable';
import getBookFormFields from '../../bookFormData';

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
