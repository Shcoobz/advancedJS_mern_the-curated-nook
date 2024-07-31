import { CloseButton, DeleteButton, SaveButton } from './Buttons';

export function FormHeader({ title, handleSave, canSave, handleDelete, onClose }) {
  return (
    <div className='form-header__container'>
      <h2>{title}</h2>
      <div className='form-header__action-buttons'>
        <SaveButton
          handleSave={handleSave}
          canSave={canSave}
          className='table__button table__button-save'
        />
        <DeleteButton
          handleDelete={handleDelete}
          className='table__button table__button-delete'
        />
        <CloseButton onClick={onClose} className='table__button table__button-close' />
      </div>
    </div>
  );
}

export function FormInput({ label, id, name, type, value, onChange, validClass = '' }) {
  return (
    <>
      <label className='form__label' htmlFor={id}>
        {label}
      </label>

      <input
        className={`form__input ${validClass}`}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
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
