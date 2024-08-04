import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { DEFAULT } from '../../../../../config/common/constants';
import { TOAST } from '../../../../../config/common/messages';
import { useAddNewLegoMutation } from '../../api/legoApiSlice';
import {
  handleSaveNewLego,
  setDefaultValue,
  useHandleLegoSuccess,
  useValidateName,
} from '../legoUtils';
import Modal from '../../../../../components/common/Modal';
import NewLegoFormTable from './NewLegoFormTable';

function NewLegoForm({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [addNewLego, { isLoading, isSuccess }] = useAddNewLegoMutation();

  const [name, setName] = useState(DEFAULT.emptyString);
  const [validName, setValidName] = useState(false);
  const [setNumber, setSetNumber] = useState(DEFAULT.emptyString);
  const [thumbnailUrl, setThumbnailUrl] = useState(DEFAULT.emptyString);
  const [imageUrl, setImageUrl] = useState(DEFAULT.emptyString);
  const [isOnWishlist, setIsOnWishlist] = useState(false);

  const canSave = Boolean(name) && !isLoading;

  useValidateName(name, setValidName);
  useHandleLegoSuccess(
    isSuccess,
    undefined,
    navigate,
    setName,
    setSetNumber,
    setThumbnailUrl,
    setImageUrl,
    setIsOnWishlist
  );

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveNewLego(
      addNewLego,
      setDefaultValue(name),
      setDefaultValue(setNumber, uuidv4()),
      setDefaultValue(thumbnailUrl),
      setDefaultValue(imageUrl),
      isOnWishlist
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.LEGO.created);
    }
  }

  const modalContent = (
    <NewLegoFormTable
      name={name}
      setName={setName}
      validName={validName}
      setNumber={setNumber}
      setSetNumber={setSetNumber}
      thumbnailUrl={thumbnailUrl}
      setThumbnailUrl={setThumbnailUrl}
      imageUrl={imageUrl}
      setImageUrl={setImageUrl}
      isOnWishlist={isOnWishlist}
      setIsOnWishlist={setIsOnWishlist}
      canSave={canSave}
      handleSave={handleSave}
      onClose={onClose}
    />
  );

  const modal = (
    <Modal isOpen={isOpen} onClose={onClose}>
      {modalContent}
    </Modal>
  );

  return modal;
}

export default NewLegoForm;
