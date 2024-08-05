import {
  FormCheckbox,
  FormInput,
  FormTextarea,
} from '../../../components/common/FormComponents';
import { getNameInputClass } from './components/tonieUtils';

const getTonieFormFields = ({ formData, handleFieldChange }) => [
  {
    component: FormInput,
    label: 'Name:',
    id: 'name',
    name: 'name',
    type: 'text',
    value: formData.name,
    onChange: handleFieldChange,
    validClass: getNameInputClass(formData.validName),
  },
  {
    component: FormTextarea,
    label: 'Description:',
    id: 'description',
    name: 'description',
    rows: 5,
    value: formData.description,
    onChange: handleFieldChange,
  },
  {
    component: FormInput,
    label: 'ThumbnailUrl:',
    id: 'thumbnailUrl',
    name: 'thumbnailUrl',
    type: 'text',
    value: formData.thumbnailUrl,
    onChange: handleFieldChange,
  },
  {
    component: FormInput,
    label: 'imageUrl:',
    id: 'imageUrl',
    name: 'imageUrl',
    type: 'text',
    value: formData.imageUrl,
    onChange: handleFieldChange,
  },
  {
    component: FormCheckbox,
    label: 'Wishlist:',
    id: 'isOnWishlist',
    name: 'isOnWishlist',
    checked: formData.isOnWishlist,
    onChange: handleFieldChange,
  },
];

export default getTonieFormFields;
