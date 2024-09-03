import { useDeleteTonieMutation, useUpdateTonieMutation } from '../../api/toniesApiSlice';
import { TOAST } from '../../../../../config/common/messages';
import TonieFormEditTable from './TonieFormEditTable';
import {
  canSave,
  generateExistingToniePayload,
  validateName,
} from '../../../../utils/formUtils';
import { ENTITY } from '../../../../../config/common/constants';
import {
  useDeleteWishlistTonieMutation,
  useUpdateWishlistTonieMutation,
} from '../../api/tonieWishlistApiSlice';
import EntityFormEdit from '../../../../entity/components/EntityEdit/EntityFormEdit';

function TonieFormEdit({ tonie, isOpen, onClose, isWishlist = false }) {
  const validations = {
    name: validateName,
  };

  const requiredFields = ['name'];
  const configuredCanSave = canSave(requiredFields);

  return (
    <EntityFormEdit
      entity={tonie}
      entityType={ENTITY.tonie}
      isOpen={isOpen}
      onClose={onClose}
      isWishlist={isWishlist}
      FormTable={TonieFormEditTable}
      useUpdateMutation={useUpdateTonieMutation}
      useUpdateWishlistMutation={useUpdateWishlistTonieMutation}
      useDeleteMutation={useDeleteTonieMutation}
      useDeleteWishlistMutation={useDeleteWishlistTonieMutation}
      generateExistingPayload={generateExistingToniePayload}
      validations={validations}
      canSaveFunction={configuredCanSave}
      successMessages={TOAST.SUCCESS.TONIE}
    />
  );
}

export default TonieFormEdit;
