import ReactDOM from 'react-dom';

function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className='modal-overlay' onClick={onClose} />
      <div className='modal-content'>{children}</div>
    </>,
    document.getElementById('modal-root')
  );
}

export default Modal;
