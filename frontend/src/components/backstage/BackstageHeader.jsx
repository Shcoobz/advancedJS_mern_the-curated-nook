import { Link } from 'react-router-dom';
import { LINK } from '../../config/common/constants';

function BackstageHeader() {
  const content = (
    <header className='backstage-header'>
      <div className='backstage-header__container'>
        <Link to={LINK.backstageRoot}>
          <h1 className='backstage-header__title'>The Curated Nook - Backstage!</h1>
        </Link>
        <nav className='backstage-header__nav'>{/* add nav buttons later */}</nav>
      </div>
    </header>
  );

  return content;
}

export default BackstageHeader;
