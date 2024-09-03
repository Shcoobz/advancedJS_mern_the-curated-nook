import getTonieFormFields from '../../tonieFormData';
import EntityFormNewTable from '../../../../entity/Components/EntityNew/EntityFormNewTable';

function TonieFormNewTable(props) {
  return (
    <EntityFormNewTable
      entityType='Tonie'
      getFormFields={getTonieFormFields}
      {...props}
    />
  );
}

export default TonieFormNewTable;
