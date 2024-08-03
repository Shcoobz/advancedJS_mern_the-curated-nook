import { Outlet, useLocation } from 'react-router-dom';
import BackstageHeader from './BackstageHeader';
import BackstageFooter from './BackstageFooter';
import Tabs from '../../features/tabs/Tabs';
import { LINK } from '../../config/common/constants';
import { useEffect, useState } from 'react';
import { useGetUsersCountQuery } from '../../features/users/api/usersApiSlice';
import { useGetBooksInCollectionCountQuery } from '../../features/inventory/books/api/booksApiSlice';
import { useGetToniesInCollectionCountQuery } from '../../features/inventory/tonies/api/toniesApiSlice';

function BackstageLayout() {
  const location = useLocation();
  const [userCount, setUserCount] = useState(null);
  const [bookCount, setBookCount] = useState(null);
  const [tonieCount, setTonieCount] = useState(null);

  const showTabs =
    location.pathname.includes(LINK.USER.viewUsers) ||
    location.pathname.includes(LINK.BOOK.viewBooks) ||
    location.pathname.includes(LINK.TONIE.viewTonies) ||
    location.pathname.includes(LINK.LEGO.viewLego);

  const { data: userCountData } = useGetUsersCountQuery();
  const { data: bookInCollectionCountData } = useGetBooksInCollectionCountQuery();
  const { data: tonieInCollectionCountData } = useGetToniesInCollectionCountQuery();

  useEffect(() => {
    if (userCountData) {
      setUserCount(userCountData.count);
    }

    if (bookInCollectionCountData) {
      setBookCount(bookInCollectionCountData.count);
    }

    if (tonieInCollectionCountData) {
      setTonieCount(tonieInCollectionCountData.count);
    }
  }, [userCountData, bookInCollectionCountData, tonieInCollectionCountData]);

  return (
    <>
      <BackstageHeader />
      <div className='backstage-container'>
        {showTabs ? (
          <Tabs
            currentPath={location.pathname}
            userCount={userCount}
            bookCount={bookCount}
            tonieCount={tonieCount}>
            <Outlet />
          </Tabs>
        ) : (
          <Outlet />
        )}
      </div>
      <BackstageFooter />
    </>
  );
}

export default BackstageLayout;
