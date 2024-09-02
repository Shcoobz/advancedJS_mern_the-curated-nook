import EntityFormEditTable from '../../../../entity/Components/EntityEdit/EntityFormEditTable';
import getBookFormFields from '../../bookFormData';

function BookFormEditTable(props) {
  return (
    <EntityFormEditTable
      {...props}
      getFormFields={getBookFormFields}
      entityType='Book'
      titleField='title'
    />
  );
}

export default BookFormEditTable;
