import {
  CloseButton,
  DeleteButton,
  SaveButton,
  ScanButton,
  SubmitButton,
} from './Buttons';

export function FormHeader({
  title,
  handleSave,
  canSave,
  handleDelete,
  handleScan,
  onClose,
  hideSaveButton = false,
}) {
  return (
    <div className='form-header__container modal__header-container'>
      <h2>{title}</h2>
      <div className='form-header__action-buttons modal__header-action-buttons'>
        {!hideSaveButton && (
          <SaveButton
            handleSave={handleSave}
            canSave={canSave}
            className='table__button table__button-save modal__button-save'
          />
        )}
        {handleDelete && (
          <DeleteButton
            handleDelete={handleDelete}
            className='table__button table__button-delete modal__button-delete'
          />
        )}
        {handleScan && (
          <ScanButton
            handleScan={handleScan}
            className='table__button table__button-scan modal__button-scan'
          />
        )}
        {onClose && (
          <CloseButton
            onClick={onClose}
            className='table__button table__button-close modal__button-delete'
          />
        )}
      </div>
    </div>
  );
}

export function FormBody({ renderFormFields, handleSave, canSave }) {
  return (
    <form className='form modal' onSubmit={handleSave}>
      {renderFormFields}
      <SubmitButton canSave={canSave} />
    </form>
  );
}

export function FormInput({
  label,
  id,
  name,
  type,
  value,
  onChange,
  validClass,
  children,
}) {
  return (
    <>
      <label className='form__label modal__label' htmlFor={id}>
        {label}
        {children}
      </label>

      <input
        className={`form__input ${validClass} modal__input`}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete='off'
      />
    </>
  );
}

export function FormTextarea({ label, id, name, rows, value, onChange }) {
  return (
    <>
      <label className='form__label' htmlFor={id}>
        {label}
      </label>

      <textarea
        className='form__textarea'
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export function FormCheckbox({ label, id, name, checked, onChange }) {
  return (
    <>
      <label className='form__label form__checkbox-container' htmlFor={id}>
        {label}

        <input
          className='form__checkbox'
          id={id}
          name={name}
          type='checkbox'
          checked={checked}
          onChange={onChange}
        />
      </label>
    </>
  );
}

export function FormSelect({
  label,
  id,
  name,
  multiple,
  size,
  value,
  onChange,
  options,
  validClass = '',
}) {
  return (
    <>
      <label className='form__label' htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        className={`form__select  ${validClass}`}
        multiple={multiple}
        size={size}
        value={value}
        onChange={onChange}>
        {options}
      </select>
    </>
  );
}

export function DynamicForm({
  title,
  formData,
  getFormFields,
  handleFieldChange,
  handleSave,
  canSave,
  handleScan,
  onClose,
  handleDelete,
  hideSaveButton = false,
}) {
  const formFields = getFormFields({
    formData,
    handleFieldChange,
  });

  const renderFormFields = formFields.map((field, index) => {
    const Component = field.component;

    return <Component key={index} {...field} />;
  });

  const formContent = (
    <>
      <FormHeader
        title={title}
        handleSave={handleSave}
        canSave={canSave}
        onClose={onClose}
        handleDelete={handleDelete}
        handleScan={handleScan}
        hideSaveButton={hideSaveButton}
      />
      <FormBody
        renderFormFields={renderFormFields}
        handleSave={handleSave}
        canSave={canSave}
      />
    </>
  );

  return formContent;
}
