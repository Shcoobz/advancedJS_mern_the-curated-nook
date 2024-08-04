import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteLegoMutation, useUpdateLegoMutation } from '../../api/legoApiSlice';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../../config/common/messages';
import Modal from '../../../../../components/common/Modal';
import {
  handleDeleteLego,
  handleSaveExistingLego,
  useHandleLegoSuccess,
  useValidateName,
} from '../legoUtils';
import EditLegoFormTable from './EditLegoFormTable';

function EditLegoForm({ lego, isOpen, onClose }) {
  const navigate = useNavigate();

  const [updateLego, { isLoading, isSuccess }] = useUpdateLegoMutation();
  const [deleteLego, { isSuccess: isDelSuccess }] = useDeleteLegoMutation();

  const [name, setName] = useState(lego.name);
  const [validName, setValidName] = useState(false);
  const [setNumber, setSetNumber] = useState(lego.setNumber);
  const [thumbnailUrl, setThumbnailUrl] = useState(lego.thumbnailUrl);
  const [imageUrl, setImageUrl] = useState(lego.imageUrl);
  const [isOnWishlist, setIsOnWishlist] = useState(lego.isOnWishlist);

  const canSave = Boolean(name) && !isLoading;

  useValidateName(name, setValidName);
  useHandleLegoSuccess(
    isSuccess,
    isDelSuccess,
    navigate,
    setName,
    setSetNumber,
    setThumbnailUrl,
    setImageUrl,
    setIsOnWishlist
  );

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveExistingLego(
      updateLego,
      lego,
      name,
      setNumber,
      thumbnailUrl,
      imageUrl,
      isOnWishlist
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.LEGO.updated);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    const result = await handleDeleteLego(deleteLego, lego.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.LEGO.deleted);
    }
  }

  const modalContent = (
    <EditLegoFormTable
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
      handleDelete={handleDelete}
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

export default EditLegoForm;
