export const createUpdateField = (setFormData) => (field, value) => {
  setFormData((prev) => ({ ...prev, [field]: value }));
};

export function handleClick(updateField) {
  return function (event) {
    const { name, type, options, checked, value } = event.target;

    if (type === 'select-multiple') {
      const values = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      updateField(name, values);
    } else {
      updateField(name, type === 'checkbox' ? checked : value);
    }
  };
}
