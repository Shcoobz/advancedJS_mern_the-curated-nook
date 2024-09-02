import { useCallback, useEffect } from 'react';

function useValidations(formData, setFormData, validations) {
  const validateField = useCallback(
    (field, validateFn) => {
      const value = formData[field];
      const isValid = validateFn(value);

      setFormData((prev) => {
        const validFieldKey = `valid${field.charAt(0).toUpperCase() + field.slice(1)}`;
        if (prev[validFieldKey] !== isValid) {
          return { ...prev, [validFieldKey]: isValid };
        }
        return prev;
      });
    },
    [formData, setFormData]
  );

  useEffect(() => {
    Object.entries(validations).forEach(([field, validateFn]) => {
      validateField(field, validateFn);
    });
  }, [validateField, validations]);
}

export default useValidations;
