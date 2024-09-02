import { useAddNewTonieMutation } from '../../api/toniesApiSlice';
import { ENTITY } from '../../../../../config/common/constants';
import { useAddNewWishlistTonieMutation } from '../../api/tonieWishlistApiSlice';
import { generateNewToniePayload, validateName } from '../../../../utils/formUtils';
import TonieFormNewTable from './TonieFormNewTable';
import EntityFormNew from '../../../../entity/Components/EntityNew/EntityFormNew';

function TonieFormNew({ isOpen, onClose, isWishlist = false }) {
  const validations = {
    name: validateName,
  };

  return (
    <EntityFormNew
      isOpen={isOpen}
      onClose={onClose}
      entity={ENTITY.tonie}
      addNewEntityMutation={useAddNewTonieMutation}
      addNewWishlistEntityMutation={useAddNewWishlistTonieMutation}
      FormTable={TonieFormNewTable}
      generateNewEntityPayload={generateNewToniePayload}
      isWishlist={isWishlist}
      validations={validations}
    />
  );
}

export default TonieFormNew;
