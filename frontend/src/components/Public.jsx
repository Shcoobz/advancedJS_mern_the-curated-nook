import { Link } from 'react-router-dom';
import { UI } from '../config/common/messages';
import { LINK } from '../config/common/constants';
import { useState } from 'react';
import Modal from './common/Modal';
import Login from '../features/auth/components/Login';

function Public() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    return setIsModalOpen(true);
  }

  function closeModal() {
    return setIsModalOpen(false);
  }

  function handleLoginClick(e) {
    e.preventDefault();
    openModal();
  }

  const content = (
    <section className='public'>
      <header>
        <h1>
          {UI.PUBLIC.title} <span className='nowrap'>{UI.PUBLIC.projectName}</span>
        </h1>
      </header>
      <main className='public__main'>
        <p>{UI.BS.paragraph}</p>
        <br />
        <p>{UI.BS.paragraph}</p>
        <br />
        <p>{UI.BS.paragraph}</p>
      </main>
      <footer>
        <Link to={LINK.login} onClick={handleLoginClick}>
          {UI.PUBLIC.login}
        </Link>
      </footer>

      <Modal isOpen={isModalOpen} onClose={closeModal} className='login-modal'>
        <Login />
      </Modal>
    </section>
  );

  return content;
}

export default Public;
