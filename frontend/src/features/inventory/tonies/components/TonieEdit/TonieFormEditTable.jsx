import EntityFormEditTable from '../../../../entity/Components/EntityEdit/EntityFormEditTable';
import getTonieFormFields from '../../tonieFormData';

function TonieFormTableEdit(props) {
  return (
    <EntityFormEditTable
      {...props}
      getFormFields={getTonieFormFields}
      entityType='Tonie'
      titleField='name'
    />
  );
}

export default TonieFormTableEdit;
