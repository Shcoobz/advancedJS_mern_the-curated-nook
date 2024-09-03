import { useGetToniesQuery } from '../../api/toniesApiSlice';
import ToniesListTable from './ToniesListTable';
import TonieFormEdit from '../TonieEdit/TonieFormEdit';
import TonieDetails from '../TonieDetails/TonieDetails';
import TonieFormNew from '../TonieNew/TonieFormNew';
import EntityList from '../../../../entity/Components/EntityList/EntityList';

function ToniesList() {
  return (
    <EntityList
      entityName='tonie'
      useGetQuery={useGetToniesQuery}
      ListTable={ToniesListTable}
      FormEdit={TonieFormEdit}
      FormNew={TonieFormNew}
      Details={TonieDetails}
    />
  );
}

export default ToniesList;
