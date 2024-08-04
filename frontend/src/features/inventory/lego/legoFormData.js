import { FormCheckbox, FormInput } from '../../../components/common/FormComponents';
import {
  handleImageUrlChange,
  handleIsOnWishlistChange,
  handleNameChange,
  handleSetNumberChange,
  handleThumbnailUrlChange,
} from './components/legoUtils';

const getFormFields = ({
  name,
  setName,
  validNameClass,
  setNumber,
  setSetNumber,
  thumbnailUrl,
  setThumbnailUrl,
  imageUrl,
  setImageUrl,
  isOnWishlist,
  setIsOnWishlist,
}) => [
  {
    component: FormInput,
    label: 'Name:',
    id: 'name',
    name: 'name',
    type: 'text',
    value: name,
    onChange: handleNameChange(setName),
    validClass: validNameClass,
  },
  {
    component: FormInput,
    label: 'SetNumber:',
    id: 'setNumber',
    name: 'setNumber',
    type: 'text',
    value: setNumber,
    onChange: handleSetNumberChange(setSetNumber),
  },
  {
    component: FormInput,
    label: 'ThumbnailUrl:',
    id: 'thumbnailUrl',
    name: 'thumbnailUrl',
    type: 'text',
    value: thumbnailUrl,
    onChange: handleThumbnailUrlChange(setThumbnailUrl),
  },
  {
    component: FormInput,
    label: 'imageUrl:',
    id: 'imageUrl',
    name: 'imageUrl',
    type: 'text',
    value: imageUrl,
    onChange: handleImageUrlChange(setImageUrl),
  },
  {
    component: FormCheckbox,
    label: 'on wishlist:',
    id: 'on-wishlist',
    name: 'on-wishlist',
    checked: isOnWishlist,
    onChange: handleIsOnWishlistChange(setIsOnWishlist),
  },
];

export default getFormFields;
