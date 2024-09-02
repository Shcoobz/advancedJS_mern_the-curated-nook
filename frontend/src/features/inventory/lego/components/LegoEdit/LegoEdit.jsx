import { useGetLegoQuery } from '../../api/legoApiSlice';
import LegoFormEdit from './LegoFormEdit';
import EntityEdit from '../../../../entity/Components/EntityEdit/EntityEdit';

function LegoEdit() {
  return (
    <EntityEdit
      useGetQuery={useGetLegoQuery}
      queryName='legoList'
      EntityFormEdit={LegoFormEdit}
      entityName='lego'
    />
  );
}

export default LegoEdit;
