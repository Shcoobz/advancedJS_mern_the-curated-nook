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
    { name: 'Tonies', path: LINK.TONIE.wishlist, count: tonieWishlistCount },
    { name: 'Lego', path: LINK.LEGO.wishlist, count: legoWishlistCount },
  ];

  function getCurrentTab() {
    return tabs.find((tab) => currentPath.includes(tab.path))?.name;
  }

  return (
    <div className='tabs-container'>
      <SearchInput setSearchTerm={onSearch} currentTab={getCurrentTab()} />
      <div className='wishlist-header'>Wishlist:</div>
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

export default WishlistTabs;
