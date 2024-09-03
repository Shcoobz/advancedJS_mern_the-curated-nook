import getUserFormFields from '../../userFormData';
import EntityFormNewTable from '../../../entity/Components/EntityNew/EntityFormNewTable';

function UserFormNewTable(props) {
  return (
    <EntityFormNewTable
      entityType='User'
      getFormFields={getUserFormFields}
      titleField='username'
      {...props}
    />
  );
}

export default UserFormNewTable;
