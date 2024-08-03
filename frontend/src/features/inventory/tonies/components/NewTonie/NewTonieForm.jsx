import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useAddNewTonieMutation } from '../../api/toniesApiSlice';
import { DEFAULT } from '../../../../../config/common/constants';
import { TOAST } from '../../../../../config/common/messages';
import {
  handleSaveNewTonie,
  setDefaultValue,
  useHandleTonieSuccess,
  useValidateName,
} from '../tonieUtils';

import Modal from '../../../../../components/common/Modal';
import NewTonieFormTable from './NewTonieFormTable';

function NewTonieForm({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [addNewTonie, { isLoading, isSuccess }] = useAddNewTonieMutation();

  const [name, setName] = useState(DEFAULT.emptyString);
  const [validName, setValidName] = useState(false);
  const [description, setDescription] = useState(DEFAULT.emptyString);
  const [thumbnailUrl, setThumbnailUrl] = useState(DEFAULT.emptyString);
  const [imageUrl, setImageUrl] = useState(DEFAULT.emptyString);
  const [isOnWishlist, setIsOnWishlist] = useState(false);

  const canSave = Boolean(name) && !isLoading;

  useValidateName(name, setValidName);
  useHandleTonieSuccess(
    isSuccess,
    undefined,
    navigate,
    setName,
    setDescription,
    setThumbnailUrl,
    setImageUrl,
    setIsOnWishlist
  );

  async function handleSave(e) {
    e.preventDefault();

    console.log('isOnWishlist b4 save:', isOnWishlist);

    const result = await handleSaveNewTonie(
      addNewTonie,
      setDefaultValue(name),
      setDefaultValue(description),
      setDefaultValue(thumbnailUrl),
      setDefaultValue(imageUrl),
      isOnWishlist
    );

    console.log('isOnWishlist after save:', isOnWishlist);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.TONIE.created);
    }
  }

  const modalContent = (
    <NewTonieFormTable
      name={name}
      setName={setName}
      validName={validName}
      description={description}
      setDescription={setDescription}
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

export default NewTonieForm;
