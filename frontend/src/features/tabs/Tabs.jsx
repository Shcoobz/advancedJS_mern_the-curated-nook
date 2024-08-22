import { Link } from 'react-router-dom';
import { LINK } from '../../config/common/constants';
import SearchInput from '../../components/common/SearchInput';
import useAuth from '../../hooks/useAuth';

function Tabs({
  currentPath,
  userCount,
  bookCount,
  tonieCount,
  legoCount,
  children,
  onSearch,
}) {
  const { isSuperuser, isAdmin } = useAuth();

  const tabs = [
    { name: 'Books', path: LINK.BOOK.viewBooks, count: bookCount },
    { name: 'Lego', path: LINK.LEGO.viewLego, count: legoCount },
    { name: 'Tonies', path: LINK.TONIE.viewTonies, count: tonieCount },
  ];

  const visibleTabs = tabs.filter((tab) => tab.count > 0);

  if (isSuperuser || isAdmin) {
    visibleTabs.unshift({ name: 'Users', path: LINK.USER.viewUsers, count: userCount });
  }

  function getCurrentTab() {
    return visibleTabs.find((tab) => currentPath.includes(tab.path))?.name;
  }

  return (
    <div className='tabs__container'>
      <div className='tabs__header'> {'>>> Inventory <<<'} </div>
      <SearchInput setSearchTerm={onSearch} currentTab={getCurrentTab()} />
      <div className='tabs'>
        {visibleTabs.map((tab) => (
          <Link
            key={tab.name}
            to={tab.path}
            className={`tab ${currentPath.includes(tab.path) ? 'active' : ''}`}>
            {tab.name} - {tab.count}
          </Link>
        ))}
      </div>
      <div className='tab__content'>{children}</div>
    </div>
  );
}

export default Tabs;
