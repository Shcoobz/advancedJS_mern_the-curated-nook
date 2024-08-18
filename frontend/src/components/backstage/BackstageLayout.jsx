import { Outlet, useLocation } from 'react-router-dom';
import { LINK } from '../../config/common/constants';
import { useEffect, useState } from 'react';
import { useGetUsersCountQuery } from '../../features/users/api/usersApiSlice';
import { useGetBooksInCollectionCountQuery } from '../../features/inventory/books/api/booksApiSlice';
import { useGetToniesInCollectionCountQuery } from '../../features/inventory/tonies/api/toniesApiSlice';
import { useGetLegoInCollectionCountQuery } from '../../features/inventory/lego/api/legoApiSlice';
import WishlistTabs from '../../features/tabs/TabsWishlist';
import { useGetToniesOnWishlistCountQuery } from '../../features/inventory/tonies/api/tonieWishlistApiSlice';
import { useGetLegoOnWishlistCountQuery } from '../../features/inventory/lego/api/legoWishlistApiSlice';
import { useGetBooksOnWishlistCountQuery } from '../../features/inventory/books/api/booksWishlistApiSlice';
import BackstageHeader from './BackstageHeader';
import BackstageFooter from './BackstageFooter';
import Tabs from '../../features/tabs/Tabs';

function BackstageLayout() {
  const location = useLocation();

  const [userCount, setUserCount] = useState(null);
  const [bookCount, setBookCount] = useState(null);
  const [tonieCount, setTonieCount] = useState(null);
  const [legoCount, setLegoCount] = useState(null);

  const [bookWishlistCount, setBookWishlistCount] = useState(null);
  const [tonieWishlistCount, setTonieWishlistCount] = useState(null);
  const [legoWishlistCount, setLegoWishlistCount] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const isWishlist =
    location.pathname.includes(LINK.BOOK.wishlist) ||
    location.pathname.includes(LINK.TONIE.wishlist) ||
    location.pathname.includes(LINK.LEGO.wishlist);

  const { data: bookWishlistCountData } = useGetBooksOnWishlistCountQuery();
  const { data: tonieWishlistCountData } = useGetToniesOnWishlistCountQuery();
  const { data: legoWishlistCountData } = useGetLegoOnWishlistCountQuery();

  const isInventory =
    location.pathname.includes(LINK.USER.viewUsers) ||
    location.pathname.includes(LINK.BOOK.viewBooks) ||
    location.pathname.includes(LINK.TONIE.viewTonies) ||
    location.pathname.includes(LINK.LEGO.viewLego);

  const { data: userCountData } = useGetUsersCountQuery();
  const { data: bookInCollectionCountData } = useGetBooksInCollectionCountQuery();
  const { data: tonieInCollectionCountData } = useGetToniesInCollectionCountQuery();
  const { data: legoInCollectionCountData } = useGetLegoInCollectionCountQuery();

  useEffect(() => {
    if (userCountData) setUserCount(userCountData.count);
    if (bookInCollectionCountData) setBookCount(bookInCollectionCountData.count);
    if (tonieInCollectionCountData) setTonieCount(tonieInCollectionCountData.count);
    if (legoInCollectionCountData) setLegoCount(legoInCollectionCountData.count);
    if (bookWishlistCountData) setBookWishlistCount(bookWishlistCountData.count);
    if (tonieWishlistCountData) setTonieWishlistCount(tonieWishlistCountData.count);
    if (legoWishlistCountData) setLegoWishlistCount(legoWishlistCountData.count);
  }, [
    userCountData,
    bookInCollectionCountData,
    tonieInCollectionCountData,
    legoInCollectionCountData,
    bookWishlistCountData,
    tonieWishlistCountData,
    legoWishlistCountData,
  ]);

  function handleSearch(term) {
    setSearchTerm(term);
  }

  const inventoryTabs = (
    <Tabs
      currentPath={location.pathname}
      userCount={userCount}
      bookCount={bookCount}
      tonieCount={tonieCount}
      legoCount={legoCount}
      onSearch={handleSearch}>
      <Outlet context={{ searchTerm }} />
    </Tabs>
  );

  const wishlistTabs = (
    <WishlistTabs
      currentPath={location.pathname}
      bookWishlistCount={bookWishlistCount}
      tonieWishlistCount={tonieWishlistCount}
      legoWishlistCount={legoWishlistCount}
      onSearch={handleSearch}>
      <Outlet context={{ searchTerm }} />
    </WishlistTabs>
  );

  return (
    <>
      <BackstageHeader />
      <div className='backstage-layout__container'>
        {isWishlist ? wishlistTabs : isInventory ? inventoryTabs : <Outlet />}
      </div>
      <BackstageFooter />
    </>
  );
}

export default BackstageLayout;
