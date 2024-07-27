import { useState } from 'react';
import { Link } from 'react-router-dom';

function Tabs() {
  const [activeTab, setActiveTab] = useState('books');

  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  return (
    <div className='tabs-wrapper'>
      <div className='tabs'>
        <Link
          className={`tabs__tab ${
            activeTab === '/backstage/users' ? 'tabs__tab--active' : ''
          }`}
          to='/backstage/users'
          onClick={() => handleTabClick('/backstage/users')}>
          Users
        </Link>
        <Link
          className={`tabs__tab ${
            activeTab === '/backstage/books' ? 'tabs__tab--active' : ''
          }`}
          to='/backstage/books'
          onClick={() => handleTabClick('/backstage/books')}>
          Books
        </Link>
        <Link
          className={`tabs__tab ${
            activeTab === '/backstage/tonies' ? 'tabs__tab--active' : ''
          }`}
          to='/backstage/tonies'
          onClick={() => handleTabClick('/backstage/tonies')}>
          Tonies
        </Link>
      </div>
    </div>
  );
}

export default Tabs;
