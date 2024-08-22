import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { LINK } from '../../config/common/constants';
import { UI } from '../../config/common/messages';
import { useSendLogoutMutation } from '../../features/auth/api/authApiSlice';
import {
  CreateHeaderButton,
  InventoryWishlistButton,
  LogoutButton,
} from '../common/Buttons';

import Spinner from '../common/Spinner';
import useAuth from '../../hooks/useAuth';
import BookFormNew from '../../features/inventory/books/components/BookNew/BookFormNew';
import UserFormNew from '../../features/users/components/UserNew/UserFormNew';
import TonieFormNew from '../../features/inventory/tonies/components/TonieNew/TonieFormNew';
import LegoFormNew from '../../features/inventory/lego/components/LegoNew/LegoFormNew';

const BACKSTAGE_REGEX = /^\/backstage(\/)?$/;
const USERS_REGEX = /^\/backstage\/users(\/)?$/;
const BOOKS_REGEX = /^\/backstage\/books(\/[a-z]+)?(\/)?$/;
const TONIES_REGEX = /^\/backstage\/tonies(\/[a-z]+)?(\/)?$/;
const LEGO_REGEX = /^\/backstage\/lego(\/[a-z]+)?(\/)?$/;

let backstageClass = null;

function BackstageHeader() {
  const { isSuperuser, isAdmin } = useAuth();
  const higherProtection = isSuperuser || isAdmin;
  const highestProtection = isAdmin;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openModal, setOpenModal] = useState(null);

  const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

  let buttonContent = [];

  useEffect(() => {
    if (isSuccess) {
      toast.success('Log out successful!');
      navigate('/');
    }

    if (isError && error) {
      toast.error(`Logout failed: ${error?.data?.message}`);
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

  function handleOpenModal(modalName) {
    return () => {
      setOpenModal(modalName);
    };
  }

  function handleCloseModal() {
    setOpenModal(null);
  }

  function handleNavigate(path) {
    return () => navigate(path);
  }

  if (isLoading) return <Spinner />;

  if (highestProtection) {
    if (USERS_REGEX.test(pathname)) {
      buttonContent.push(
        <CreateHeaderButton
          onClick={handleOpenModal('user')}
          title='New User'
          item='user'
        />
      );
    }
  }

  if (higherProtection) {
    if (BOOKS_REGEX.test(pathname)) {
      buttonContent.push(
        <CreateHeaderButton
          onClick={handleOpenModal('book')}
          title='New Book'
          item='book'
        />
      );
    }
  }

  if (BOOKS_REGEX.test(pathname)) {
    buttonContent.push(
      <InventoryWishlistButton
        key='inventory-wishlist'
        pathname={pathname}
        handleInventoryClick={handleNavigate(LINK.BOOK.viewBooks)}
        handleWishlistClick={handleNavigate(LINK.BOOK.wishlist)}
      />
    );
  }

  if (higherProtection) {
    if (LEGO_REGEX.test(pathname)) {
      buttonContent.push(
        <CreateHeaderButton
          onClick={handleOpenModal('lego')}
          title='New Lego'
          item='lego'
        />
      );
    }
  }

  if (LEGO_REGEX.test(pathname)) {
    buttonContent.push(
      <InventoryWishlistButton
        key='inventory-wishlist'
        pathname={pathname}
        handleInventoryClick={handleNavigate(LINK.LEGO.viewLego)}
        handleWishlistClick={handleNavigate(LINK.LEGO.wishlist)}
      />
    );
  }

  if (higherProtection) {
    if (TONIES_REGEX.test(pathname)) {
      buttonContent.push(
        <CreateHeaderButton
          onClick={handleOpenModal('tonie')}
          title='New Tonie'
          item='tonie'
        />
      );
    }
  }

  if (TONIES_REGEX.test(pathname)) {
    buttonContent.push(
      <InventoryWishlistButton
        key='inventory-wishlist-tonie'
        pathname={pathname}
        handleInventoryClick={handleNavigate(LINK.TONIE.viewTonies)}
        handleWishlistClick={handleNavigate(LINK.TONIE.wishlist)}
      />
    );
  }

  buttonContent.push(<LogoutButton key='logout' onClick={sendLogout} />);

  const backstageHeaderContent = (
    <header className='backstage-header'>
      <div className={`backstage-header__container ${backstageClass}`}>
        <Link to={LINK.bsRoot}>
          <h1 className='backstage-header__title'>{UI.BS.title}</h1>
        </Link>
        <nav className='backstage-header__nav'>{buttonContent}</nav>
      </div>
      {openModal === 'user' && <UserFormNew isOpen={true} onClose={handleCloseModal} />}
      {openModal === 'book' && <BookFormNew isOpen={true} onClose={handleCloseModal} />}
      {openModal === 'lego' && <LegoFormNew isOpen={true} onClose={handleCloseModal} />}
      {openModal === 'tonie' && <TonieFormNew isOpen={true} onClose={handleCloseModal} />}
    </header>
  );

  return backstageHeaderContent;
}

export default BackstageHeader;
