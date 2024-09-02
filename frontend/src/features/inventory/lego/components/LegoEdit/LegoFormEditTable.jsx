import EntityFormEditTable from '../../../../entity/Components/EntityEdit/EntityFormEditTable.jsx';
import getLegoFormFields from '../../legoFormData.jsx';

function LegoFormEditTable({ props }) {
  return (
    <EntityFormEditTable
      {...props}
      getFormFields={getLegoFormFields}
      entityType='Lego Set'
      titleField='name'
    />
  );
}

export default LegoFormEditTable;
