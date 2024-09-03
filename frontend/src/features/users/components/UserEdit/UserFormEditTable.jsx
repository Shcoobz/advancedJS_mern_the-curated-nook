import getUserFormFields from '../../../../data/userFormData';
import EntityFormEditTable from '../../../entity/components/EntityEdit/EntityFormEditTable';

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
