import { Outlet } from 'react-router-dom';
import BackstageHeader from './BackstageHeader';
import BackstageFooter from './BackstageFooter';

const BackstageLayout = () => {
  return (
    <>
      <BackstageHeader />
      <div className='backstage-container'>
        <Outlet />
      </div>
      <BackstageFooter />
    </>
  );
};
export default BackstageLayout;
