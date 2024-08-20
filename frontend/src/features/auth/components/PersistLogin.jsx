import { useSelector } from 'react-redux';
import usePersist from '../../../hooks/usePersist';
import { useEffect, useRef, useState } from 'react';
import { selectCurrentToken } from '../state/authSlice';
import { useRefreshMutation } from '../api/authApiSlice';
import { Outlet } from 'react-router-dom';
import Spinner from '../../../components/common/Spinner';
import { FormErrorMessage } from '../../../components/common/FormComponents';
import { API } from '../../../config/common/constants';

function PersistLogin() {
  const token = useSelector((state) => selectCurrentToken(state, API.AUTH.sliceName));

  const effectRan = useRef(false);
  const [persist] = usePersist();
  const [trueSuccess, setTrueSuccess] = useState(false);
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  let content;

  useEffect(() => {
    if (effectRan.current === true || import.meta.env.VITE_NODE_ENV !== 'development') {
      // React 18 Strict Mode
      verifyRefreshToken();

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  async function verifyRefreshToken() {
    try {
      //const response =
      await refresh();
      //const { accessToken } = response.data
      setTrueSuccess(true);
    } catch (err) {
      console.error(err);
    }
  }

  switch (true) {
    case !persist:
      // persist: no
      content = <Outlet />;
      break;

    case isLoading:
      // persist: yes, token: no
      content = <Spinner />;
      break;

    case isError:
      // persist: yes, token: no
      content = <FormErrorMessage message={error.data?.message} />;
      break;

    case isSuccess && trueSuccess:
      // persist: yes, token: yes
      content = <Outlet />;
      break;

    case token && isUninitialized:
      // persist: yes, token: yes
      console.log(isUninitialized);
      content = <Outlet />;
      break;

    default:
      content = null;
      break;
  }

  return content;
}

export default PersistLogin;
