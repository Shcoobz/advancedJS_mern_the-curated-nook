import { Link } from 'react-router-dom';

const tabs = [
  { name: 'Users', path: '/backstage/users' },
  { name: 'Books', path: '/backstage/books' },
  { name: 'Tonies', path: '/backstage/tonies' },
];

export default function Tabs({ currentPath, children }) {
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
