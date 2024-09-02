import { useAddLegoNewMutation } from '../../api/legoApiSlice';
import { generateLegoNewPayload, validateName } from '../../../../utils/formUtils';
import { ENTITY } from '../../../../../config/common/constants';
import { handleSelectSuggestion } from '../../../../utils/fetchUtils';
import { useAddNewWishlistLegoMutation } from '../../api/legoWishlistApiSlice';
import EntityFormNew from '../../../../entity/Components/EntityNew/EntityFormNew';
import LegoFormTableNew from './LegoFormNewTable';

function LegoFormNew({ isOpen, onClose, isWishlist = false }) {
  const additionalProps = {
    handleSelectSuggestion: (selectedLego, setFormData) =>
      handleSelectSuggestion(selectedLego, 'lego', setFormData),
  };

  return (
    <EntityFormNew
      isOpen={isOpen}
      onClose={onClose}
      entity={ENTITY.lego}
      addNewEntityMutation={useAddLegoNewMutation}
      addNewWishlistEntityMutation={useAddNewWishlistLegoMutation}
      FormTable={LegoFormTableNew}
      generateNewEntityPayload={generateLegoNewPayload}
      isWishlist={isWishlist}
      validations={{ name: validateName }}
      additionalProps={additionalProps}
    />
  );
}

export default LegoFormNew;
