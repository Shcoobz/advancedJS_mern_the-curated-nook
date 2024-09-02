import { useDeleteLegoMutation } from '../../api/legoApiSlice';
import { TOAST } from '../../../../../config/common/messages';
import EntityDetails from '../../../../entity/Components/EntityDetails/EntityDetails';
import LegoDetailsTable from './LegoDetailsTable';

function LegoDetails({ lego, isOpen, onClose, onEdit }) {
  return (
    <EntityDetails
      entity={lego}
      entityName='Lego'
      isOpen={isOpen}
      onClose={onClose}
      onEdit={onEdit}
      useDeleteMutation={useDeleteLegoMutation}
      DetailsTable={LegoDetailsTable}
      successMessage={TOAST.SUCCESS.LEGO.deleted}
    />
  );
}

export default LegoDetails;
