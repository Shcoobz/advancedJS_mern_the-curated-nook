import { Link } from 'react-router-dom';
import { LINK } from '../../config/common/constants';

const tabs = [
  { name: 'Users', path: LINK.USER.viewUsers },
  { name: 'Books', path: LINK.BOOK.viewBooks },
  { name: 'Tonies', path: LINK.TONIE.viewTonies },
  { name: 'Lego', path: LINK.LEGO.viewLego },
];

function Tabs({ currentPath, children }) {
  return (
    <div className='tabs-container'>
      <div className='tabs'>
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            to={tab.path}
            className={`tab ${currentPath.includes(tab.path) ? 'active' : ''}`}>
            {tab.name}
          </Link>
        ))}
      </div>
      <div className='tab-content'>{children}</div>
    </div>
  );
}

export default Tabs;

