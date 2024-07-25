import { Link } from 'react-router-dom';
import { LINK } from '../../../config/common/constants';
import { UI } from '../../../config/common/messages';
import { formatDate } from '../utils/utils';

function Welcome() {
  const date = new Date();
  const today = formatDate(date);

  const content = (
    <section className='welcome'>
      <p>{today}</p>

      <h1>{UI.BACKSTAGE.welcome}</h1>
      <p>{UI.BACKSTAGE.paragraph}</p>
      <p>{UI.BACKSTAGE.paragraph}</p>
      <p>{UI.BACKSTAGE.paragraph}</p>

      <br />

      <p>
        <Link to={LINK.backstageViewBooks}>{UI.BACKSTAGE.viewBooks}</Link>
      </p>

      <p>
        <Link to={LINK.backstageViewUsers}>{UI.BACKSTAGE.viewUsers}</Link>
      </p>
    </section>
  );

  return content;
}

export default Welcome;
