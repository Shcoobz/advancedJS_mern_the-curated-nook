import { Link } from 'react-router-dom';

const BackstageHeader = () => {
  const content = (
    <header className='backstage-header'>
      <div className='backstage-header__container'>
        <Link to='/backstage'>
          <h1 className='backstage-header__title'>techNotes</h1>
        </Link>
        <nav className='backstage-header__nav'>{/* add nav buttons later */}</nav>
      </div>
    </header>
  );

  return content;
};
export default BackstageHeader;
