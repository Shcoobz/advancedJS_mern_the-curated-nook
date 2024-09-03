import { FormCheckbox, FormInput } from '../components/common/FormComponents';
import FormInputWithSuggestions from '../components/common/FormInputWithSuggestions';
import {
  fetchLegoSetByNumber,
  fetchLegoSetByName,
} from '../features/utils/fetchUtils/fetchLego';
import { getInputClass } from '../features/utils/formUtils';

const getLegoFormFields = ({ formData, handleFieldChange, handleSelectSuggestion }) => [
  {
    component: FormInputWithSuggestions,
    label: 'Set Number',
    id: 'setNumber',
    name: 'setNumber',
    value: formData.setNumber,
    onChange: handleFieldChange,
    onSelectSuggestion: handleSelectSuggestion,
    validClass: getInputClass(formData.validSetNumber, 'setNumber'),
    fetchSuggestions: fetchLegoSetByNumber,
    renderItem: (item) => `${item.name} - ${item.setNumber}`,
    children: <span className='nowrap'>{'[SET NUMBER or TITLE needed]'}</span>,
  },
  {
    component: FormInputWithSuggestions,
    label: 'Name',
    id: 'name',
    name: 'name',
    value: formData.name,
    onChange: handleFieldChange,
    onSelectSuggestion: handleSelectSuggestion,
    validClass: getInputClass(formData.validName, 'name'),
    fetchSuggestions: fetchLegoSetByName,
    renderItem: (item) => `${item.name} - ${item.setNumber}`,
    children: <span className='nowrap'>{'[SET NUMBER or NAME needed]'}</span>,
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
    component: FormInput,
    label: 'Theme Id:',
    id: 'themeId',
    name: 'themeId',
    type: 'text',
    value: formData.themeId,
    onChange: handleFieldChange,
  },
  {
    component: FormInput,
    label: 'Theme Name:',
    id: 'themeName',
    name: 'themeName',
    type: 'text',
    value: formData.themeName,
    onChange: handleFieldChange,
  },
  {
    component: FormInput,
    label: 'Year:',
    id: 'year',
    name: 'year',
    type: 'text',
    value: formData.year,
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

export default getLegoFormFields;
