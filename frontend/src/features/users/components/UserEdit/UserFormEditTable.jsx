import EntityFormEditTable from '../../../entity/Components/EntityEdit/EntityFormEditTable';
import getUserFormFields from '../../userFormData';

function UserFormEditTable(props) {
  return (
    <EntityFormEditTable
      {...props}
      getFormFields={getUserFormFields}
      entityType='User'
      titleField='username'
    />
  );
}

export default UserFormEditTable;
