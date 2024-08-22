import { useNavigate } from 'react-router-dom';
import { UI } from '../../../config/common/messages';
import { DATE, LINK } from '../../../config/common/constants';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import UserFormNew from '../../users/components/UserNew/UserFormNew';

import BookFormNew from '../../inventory/books/components/BookNew/BookFormNew';
import LegoFormNew from '../../inventory/lego/components/LegoNew/LegoFormNew';
import TonieFormNew from '../../inventory/tonies/components/TonieNew/TonieFormNew';

// Todo:
// * add nice buttons instead of just links
// * replace with  constants
// * move date & formatDate to utils
// * add more general styling -> center etc.
// * add some text
// * make time && date bigger, center?

function Welcome() {
  const navigate = useNavigate();
  const { username, isSuperuser, isAdmin } = useAuth();
  const [openModal, setOpenModal] = useState(null);
  const higherProtection = isSuperuser || isAdmin;
  const highestProtection = isAdmin;

  const date = new Date();
  const formatDate = new Intl.DateTimeFormat(DATE.locale, {
    dateStyle: DATE.dateStyle,
    timeStyle: DATE.timeStyle,
  });

  let formattedDateTime = formatDate.format(date);
  let today = formattedDateTime.replace(' um ', ' || Uhrzeit: ').replace('MESZ', '');

  function handleNavigate(path) {
    return () => {
      navigate(path);
    };
  }

  function handleOpenModal(modalName) {
    return () => {
      setOpenModal(modalName);
    };
  }

  function handleCloseModal() {
    setOpenModal(null);
  }

  const content = (
    <section className='welcome'>
      <p>{today}</p>

      <br />

      <h1>
        {UI.BS.PAGE.WELCOME.greeting} {username} !
      </h1>

      <br />

      <p>{UI.BS.PAGE.WELCOME.paragraph}</p>

      <br />

      <button onClick={handleNavigate(LINK.BOOK.viewBooks)}>Inventory</button>
      <button onClick={handleNavigate(LINK.BOOK.wishlist)}>Wishlist</button>

      {higherProtection && (
        <button onClick={handleOpenModal('user')} title='New User'>
          New User
        </button>
      )}

      {higherProtection && (
        <button onClick={handleOpenModal('book')} title='New Book'>
          New Book
        </button>
      )}

      {higherProtection && (
        <button onClick={handleOpenModal('lego')} title='New Lego'>
          New Lego
        </button>
      )}

      {higherProtection && (
        <button onClick={handleOpenModal('tonie')} title='New Tonie'>
          New Tonie
        </button>
      )}

      {openModal === 'user' && <UserFormNew isOpen={true} onClose={handleCloseModal} />}
      {openModal === 'book' && <BookFormNew isOpen={true} onClose={handleCloseModal} />}
      {openModal === 'lego' && <LegoFormNew isOpen={true} onClose={handleCloseModal} />}
      {openModal === 'tonie' && <TonieFormNew isOpen={true} onClose={handleCloseModal} />}
    </section>
  );

  return content;
}

export default Welcome;
