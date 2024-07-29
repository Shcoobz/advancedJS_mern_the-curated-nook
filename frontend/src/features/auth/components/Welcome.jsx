import { Link } from 'react-router-dom';
import { UI } from '../../../config/common/messages';
import { DATE, LINK } from '../../../config/common/constants';

function Welcome() {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat(DATE.locale, {
    dateStyle: DATE.dateStyle,
    timeStyle: DATE.timeStyle,
  });

  let formattedDateTime = formatter.format(date);
  let today = formattedDateTime.replace(' um ', ' || Uhrzeit: ').replace('MESZ', '');

  const content = (
    <section className='welcome'>
      <p>{today}</p>

      <h1>{UI.BS.welcome}</h1>

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
