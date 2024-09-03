import getLegoFormFields from '../../../../../data/legoFormData';
import EntityFormNewTable from '../../../../entity/components/EntityNew/EntityFormNewTable';

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
