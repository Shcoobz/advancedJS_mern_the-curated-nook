import getTonieFormFields from '../../../../../data/tonieFormData';
import EntityFormEditTable from '../../../../entity/components/EntityEdit/EntityFormEditTable';

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
