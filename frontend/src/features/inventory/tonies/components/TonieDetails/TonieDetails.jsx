import { useDeleteTonieMutation } from '../../api/toniesApiSlice';
import { TOAST } from '../../../../../config/common/messages';
import TonieDetailsTable from './TonieDetailsTable';
import EntityDetails from '../../../../entity/Components/EntityDetails/EntityDetails';

function TonieDetails({ tonie, isOpen, onClose, onEdit }) {
  return (
    <EntityDetails
      entity={tonie}
      entityName='Tonie'
      isOpen={isOpen}
      onClose={onClose}
      onEdit={onEdit}
      useDeleteMutation={useDeleteTonieMutation}
      DetailsTable={TonieDetailsTable}
      successMessage={TOAST.SUCCESS.TONIE.deleted}
    />
  );
}

export default TonieDetails;
