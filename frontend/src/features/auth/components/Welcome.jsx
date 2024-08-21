import { Link, useNavigate } from 'react-router-dom';
import { UI } from '../../../config/common/messages';
import { DATE, LINK } from '../../../config/common/constants';
import useAuth from '../../../hooks/useAuth';

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
      <button onClick={handleNavigate(LINK.USER.viewBooks)}>Add User</button>
      <button onClick={handleNavigate(LINK.BOOK.wishlist)}>Wishlist</button>
    </section>
  );

  return content;
}

export default Welcome;
