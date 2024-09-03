import getUserFormFields from '../../../../data/userFormData';
import EntityFormNewTable from '../../../entity/components/EntityNew/EntityFormNewTable';

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
