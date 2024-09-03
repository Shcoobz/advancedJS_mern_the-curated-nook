import getBookFormFields from '../../../../../data/bookFormData';
import EntityFormEditTable from '../../../../entity/components/EntityEdit/EntityFormEditTable';

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
