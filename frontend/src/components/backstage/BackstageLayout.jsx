import { Outlet, useLocation } from 'react-router-dom';
import BackstageHeader from './BackstageHeader';
import BackstageFooter from './BackstageFooter';
import Tabs from '../../features/tabs/Tabs';
import { LINK } from '../../config/common/constants';

function BackstageLayout() {
  const location = useLocation();
  const showTabs =
    location.pathname.includes(LINK.USER.viewUsers) ||
    location.pathname.includes(LINK.BOOK.viewBooks) ||
    location.pathname.includes(LINK.TONIE.viewTonies) ||
    location.pathname.includes(LINK.LEGO.viewLego);

  return (
    <>
      <BackstageHeader />
      <div className='backstage-container'>
        {showTabs ? (
          <Tabs currentPath={location.pathname}>
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
