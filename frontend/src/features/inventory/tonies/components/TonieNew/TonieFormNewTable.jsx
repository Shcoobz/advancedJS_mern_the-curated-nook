import EntityFormNewTable from '../../../../entity/components/EntityNew/EntityFormNewTable';
import getTonieFormFields from '../../../../../data/tonieFormData';

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
