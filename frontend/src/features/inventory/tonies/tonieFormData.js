import {
  FormCheckbox,
  FormInput,
  FormTextarea,
} from '../../../components/common/FormComponents';
import {
  handleDescriptionChange,
  handleImageUrlChange,
  handleIsOnWishlistChange,
  handleNameChange,
  handleThumbnailUrlChange,
} from './components/tonieUtils';

const getFormFields = ({
  name,
  setName,
  validNameClass,
  description,
  setDescription,
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
    component: FormTextarea,
    label: 'Description:',
    id: 'description',
    name: 'description',
    rows: 5,
    value: description,
    onChange: handleDescriptionChange(setDescription),
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
    label: 'On Wishlist:',
    id: 'on-wishlist',
    name: 'on-wishlist',
    checked: isOnWishlist,
    onChange: handleIsOnWishlistChange(setIsOnWishlist),
  },
];

export default getFormFields;
