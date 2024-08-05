export const createUpdateField = (setFormData) => (field, value) => {
  setFormData((prev) => ({ ...prev, [field]: value }));
};
