import EntityFormNewTable from '../../../../entity/Components/EntityNew/EntityFormNewTable';
import getLegoFormFields from '../../legoFormData';

function LegoFormNewTable(props) {
  return (
    <EntityFormNewTable
      entityType='Lego Set'
      getFormFields={getLegoFormFields}
      {...props}
    />
  );
}

export default LegoFormNewTable;
