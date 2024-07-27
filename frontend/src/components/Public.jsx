import { Link } from 'react-router-dom';
import { UI } from '../config/common/messages';
import { LINK } from '../config/common/constants';

function Public() {
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
        <Link to={LINK.login}>{UI.PUBLIC.login}</Link>
      </footer>
    </section>
  );

  return content;
}
export default Public;
