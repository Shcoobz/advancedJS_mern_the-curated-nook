import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { LINK } from '../../config/common/constants';
import { UI } from '../../config/common/messages';

function BackstageFooter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function onGoHomeClicked() {
    return navigate(LINK.bsRoot);
  }

  let goHomeButton = null;
  if (pathname !== LINK.bsRoot) {
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
      <p>{UI.BS.currentUser}</p>
      <p>{UI.BS.status}</p>
    </footer>
  );

  return content;
}

export default BackstageFooter;
