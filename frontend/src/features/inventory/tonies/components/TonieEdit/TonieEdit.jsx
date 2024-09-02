import { useGetToniesQuery } from '../../api/toniesApiSlice';
import TonieFormEdit from './TonieFormEdit';
import EntityEdit from '../../../../entity/Components/EntityEdit/EntityEdit';

function TonieEdit() {
  return (
    <EntityEdit
      useGetQuery={useGetToniesQuery}
      queryName='toniesList'
      EntityFormEdit={TonieFormEdit}
      entityName='tonie'
    />
  );
}

export default TonieEdit;
