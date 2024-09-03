import { useGetLegoQuery } from '../../api/legoApiSlice';
import LegoListTable from './LegoListTable';
import LegoFormEdit from '../LegoEdit/LegoFormEdit';
import LegoDetails from '../LegoDetails/LegoDetails';
import EntityList from '../../../../entity/Components/EntityList/EntityList';
import LegoFormNew from '../LegoNew/LegoFormNew';

function LegoList() {
  return (
    <EntityList
      entityName='lego'
      useGetQuery={useGetLegoQuery}
      ListTable={LegoListTable}
      FormEdit={LegoFormEdit}
      FormNew={LegoFormNew}
      Details={LegoDetails}
    />
  );
}

export default LegoList;
