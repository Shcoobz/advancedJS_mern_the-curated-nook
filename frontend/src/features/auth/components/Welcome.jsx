import { Link } from 'react-router-dom';
import { UI } from '../../../config/common/messages';
import { LINK } from '../../../config/common/constants';

function Welcome() {
  const date = new Date();
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date);

  const content = (
    <section className='welcome'>
      <p>{today}</p>

      <h1>{UI.BS.welcome}</h1>

      <p>
        <Link to={LINK.bsViewUsers}>{UI.BS.viewUsers}</Link>
      </p>

      <p>
        <Link to={LINK.bsViewBooks}>{UI.BS.viewBooks}</Link>
      </p>

      <p>
        <Link to={LINK.bsViewTonies}>{UI.BS.viewTonies}</Link>
      </p>

      <p>
        <Link to={LINK.bsViewLego}>{UI.BS.viewLego}</Link>
      </p>
    </section>
  );

  return content;
}
export default Welcome;
