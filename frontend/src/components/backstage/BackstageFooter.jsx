import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

function BackstageFooter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate('/backstage');

  let goHomeButton = null;
  if (pathname !== '/backstage') {
    goHomeButton = (
      <button
        className='backstage-footer__button icon-button'
        title='Home'
        onClick={onGoHomeClicked}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  const content = (
    <footer className='backstage-footer'>
      {goHomeButton}
      <p>Current User:</p>
      <p>Status:</p>
    </footer>
  );

  return content;
}

export default BackstageFooter;
