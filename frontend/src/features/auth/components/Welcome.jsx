import { Link } from 'react-router-dom';
import { UI } from '../../../config/common/messages';
import { DATE, LINK } from '../../../config/common/constants';

// Todo:
// * add nice buttons instead of just links
// * replace with  constants
// * move date & formatDate to utils
// * add more general styling -> center etc.
// * add some text
// * make time && date bigger, center?

function Welcome() {
  const date = new Date();
  const formatDate = new Intl.DateTimeFormat(DATE.locale, {
    dateStyle: DATE.dateStyle,
    timeStyle: DATE.timeStyle,
  });

  let formattedDateTime = formatDate.format(date);
  let today = formattedDateTime.replace(' um ', ' || Uhrzeit: ').replace('MESZ', '');

  const content = (
    <section className='welcome'>
      <p>{today}</p>

      <br />

      <h1>{UI.BS.welcome}</h1>

      <br />

      <p>{UI.BS.paragraph}</p>

      <br />

      <p>
        <Link to={LINK.USER.viewUsers}>{UI.BS.viewUsers}</Link>
      </p>

      <p>
        <Link to={LINK.BOOK.viewBooks}>{UI.BS.viewBooks}</Link>
      </p>

      <p>
        <Link to={LINK.TONIE.viewTonies}>{UI.BS.viewTonies}</Link>
      </p>

      <p>
        <Link to={LINK.LEGO.viewLego}>{UI.BS.viewLego}</Link>
      </p>
    </section>
  );

  return content;
}

export default Welcome;
