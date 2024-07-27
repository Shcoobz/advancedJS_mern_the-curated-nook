import { Link } from 'react-router-dom';
import { LINK } from '../../config/common/constants';
import { UI } from '../../config/common/messages';

function BackstageHeader() {
  const content = (
    <header className='backstage-header'>
      <div className='backstage-header__container'>
        <Link to={LINK.bsRoot}>
          <h1 className='backstage-header__title'>{UI.BS.title}</h1>
        </Link>
        <nav className='backstage-header__nav'>{/* add nav buttons later */}</nav>
      </div>
    </header>
  );

  return content;
}

export default BackstageHeader;
