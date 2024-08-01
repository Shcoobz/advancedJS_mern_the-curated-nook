import { Link } from 'react-router-dom';
import { LINK } from '../../config/common/constants';

function Tabs({ currentPath, userCount, bookCount, tonieCount, children }) {
  const tabs = [
    { name: 'Users', path: LINK.USER.viewUsers, count: userCount },
    { name: 'Books', path: LINK.BOOK.viewBooks, count: bookCount },
    { name: 'Tonies', path: LINK.TONIE.viewTonies, count: tonieCount },
    { name: 'Lego', path: LINK.LEGO.viewLego },
  ];

  return (
    <div className='tabs-container'>
      <div className='tabs'>
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            to={tab.path}
            className={`tab ${currentPath.includes(tab.path) ? 'active' : ''}`}>
            {tab.name} {tab.count > 0 ? `- ${tab.count}` : ''}
          </Link>
        ))}
      </div>
      <div className='tab-content'>{children}</div>
    </div>
  );
}

export default Tabs;
