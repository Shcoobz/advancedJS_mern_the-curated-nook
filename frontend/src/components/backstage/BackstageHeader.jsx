import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { LINK } from '../../config/common/constants';
import { UI } from '../../config/common/messages';
import { useSendLogoutMutation } from '../../features/auth/api/authApiSlice';
import { LogoutButton } from '../common/Buttons';

import Spinner from '../common/Spinner';

const BACKSTAGE_REGEX = /^\/backstage(\/)?$/;
const USERS_REGEX = /^\/backstage\/users(\/)?$/;
const BOOKS_REGEX = /^\/backstage\/books(\/)?$/;
const TONIES_REGEX = /^\/backstage\/tonies(\/)?$/;
const LEGO_REGEX = /^\/backstage\/lego(\/)?$/;
let backstageClass = null;

function BackstageHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Log out successful!');
      navigate('/');
    }

    if (isError && error) {
      toast.error(`Logout failed: ${error.data?.message}`);
    }
  }, [isSuccess, isError, error, navigate]);

  if (
    !BACKSTAGE_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname) &&
    !BOOKS_REGEX.test(pathname) &&
    !TONIES_REGEX.test(pathname) &&
    !LEGO_REGEX.test(pathname)
  ) {
    backstageClass = 'backstage-header__container--small';
  }

  if (isLoading) return <Spinner />;

  const content = (
    <header className='backstage-header'>
      <div className={`backstage-header__container ${backstageClass}`}>
        <Link to={LINK.bsRoot}>
          <h1 className='backstage-header__title'>{UI.BS.title}</h1>
        </Link>
        <nav className='backstage-header__nav'>
          {/* add more buttons later */}
          <LogoutButton onClick={sendLogout} />
        </nav>
      </div>
    </header>
  );

  return content;
}

export default BackstageHeader;
