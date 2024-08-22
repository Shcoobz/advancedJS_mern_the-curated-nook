import { Link } from 'react-router-dom';
import { LINK } from '../../config/common/constants';
import SearchInput from '../../components/common/SearchInput';

function WishlistTabs({
  currentPath,
  bookWishlistCount,
  tonieWishlistCount,
  legoWishlistCount,
  children,
  onSearch,
}) {
  const tabs = [
    { name: 'Books', path: LINK.BOOK.wishlist, count: bookWishlistCount },
    { name: 'Lego', path: LINK.LEGO.wishlist, count: legoWishlistCount },
    { name: 'Tonies', path: LINK.TONIE.wishlist, count: tonieWishlistCount },
  ];

  const visibleTabs = tabs.filter((tab) => tab.count > 0);

  function getCurrentTab() {
    return visibleTabs.find((tab) => currentPath.includes(tab.path))?.name;
  }

  return (
    <div className='tabs__container'>
      <div className='tabs__header'>{'>>> Wishlist <<<'}</div>
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

export default WishlistTabs;
