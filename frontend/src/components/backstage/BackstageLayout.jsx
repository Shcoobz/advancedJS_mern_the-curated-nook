import { Outlet, useLocation } from 'react-router-dom';
import BackstageHeader from './BackstageHeader';
import BackstageFooter from './BackstageFooter';
import Tabs from '../../features/tabs/Tabs';

function BackstageLayout() {
  const location = useLocation();
  const showTabs =
    location.pathname.includes('/backstage/users') ||
    location.pathname.includes('/backstage/books') ||
    location.pathname.includes('/backstage/tonies');

  return (
    <>
      <BackstageHeader />
      <div className='backstage-container'>
        {showTabs ? (
          <Tabs currentPath={location.pathname}>
            <Outlet />
          </Tabs>
        ) : null}
      </div>
      <BackstageFooter />
    </>
  );
}

export default BackstageLayout;
