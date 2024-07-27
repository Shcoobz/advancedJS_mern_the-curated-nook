import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Tabs() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  return (
    <div className='tabs-wrapper'>
      <div className='tabs'>
        <Link
          className={`tabs__tab ${
            activeTab === '/backstage/users' ? 'tabs__tab--active' : ''
          }`}
          to='/backstage/users'
          onClick={() => setActiveTab('/backstage/users')}>
          Users
        </Link>
        <Link
          className={`tabs__tab ${
            activeTab === '/backstage/books' ? 'tabs__tab--active' : ''
          }`}
          to='/backstage/books'
          onClick={() => setActiveTab('/backstage/books')}>
          Books
        </Link>
        <Link
          className={`tabs__tab ${
            activeTab === '/backstage/tonies' ? 'tabs__tab--active' : ''
          }`}
          to='/backstage/tonies'
          onClick={() => setActiveTab('/backstage/tonies')}>
          Tonies
        </Link>
      </div>
    </div>
  );
}

export default Tabs;
