import getLegoFormFields from '../../../../../data/legoFormData.jsx';
import EntityFormEditTable from '../../../../entity/components/EntityEdit/EntityFormEditTable.jsx';

function LegoFormEditTable(props) {
  return (
    <EntityFormEditTable
      {...props}
      getFormFields={getLegoFormFields}
      entityType='Lego'
      titleField='name'
    />
  );
}

export default LegoFormEditTable;
