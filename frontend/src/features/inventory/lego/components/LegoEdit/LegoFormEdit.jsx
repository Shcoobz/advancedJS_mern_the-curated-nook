import { useDeleteLegoMutation, useUpdateLegoMutation } from '../../api/legoApiSlice';
import { TOAST } from '../../../../../config/common/messages';
import LegoFormEditTable from './LegoFormEditTable';
import {
  canSave,
  generateExistingLegoPayload,
  validateName,
} from '../../../../utils/formUtils';
import { ENTITY } from '../../../../../config/common/constants';
import {
  useDeleteWishlistLegoMutation,
  useUpdateWishlistLegoMutation,
} from '../../api/legoWishlistApiSlice';
import EntityFormEdit from '../../../../entity/components/EntityEdit/EntityFormEdit';

function LegoFormEdit({ lego, isOpen, onClose, isWishlist = false }) {
  const validations = {
    name: validateName,
  };

  const requiredFields = ['name'];
  const configuredCanSave = canSave(requiredFields);

  return (
    <EntityFormEdit
      entity={lego}
      entityType={ENTITY.lego}
      isOpen={isOpen}
      onClose={onClose}
      isWishlist={isWishlist}
      FormTable={LegoFormEditTable}
      useUpdateMutation={useUpdateLegoMutation}
      useUpdateWishlistMutation={useUpdateWishlistLegoMutation}
      useDeleteMutation={useDeleteLegoMutation}
      useDeleteWishlistMutation={useDeleteWishlistLegoMutation}
      generateExistingPayload={generateExistingLegoPayload}
      validations={validations}
      canSaveFunction={configuredCanSave}
      successMessages={TOAST.SUCCESS.LEGO}
    />
  );
}

export default LegoFormEdit;
