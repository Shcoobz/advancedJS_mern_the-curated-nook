import { useNavigate } from 'react-router-dom';
import { useDeleteTonieMutation, useUpdateTonieMutation } from '../../api/toniesApiSlice';
import { useState } from 'react';
import {
  handleDeleteTonie,
  handleSaveExistingTonie,
  useHandleTonieSuccess,
  useValidateName,
} from '../tonieUtils';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../../config/common/messages';
import EditTonieFormTable from './EditTonieFormTable';
import Modal from '../../../../../components/common/Modal';

function EditTonieForm({ tonie, isOpen, onClose }) {
  const navigate = useNavigate();

  const [updateTonie, { isLoading, isSuccess }] = useUpdateTonieMutation();
  const [deleteTonie, { isSuccess: isDelSuccess }] = useDeleteTonieMutation();

  const [name, setName] = useState(tonie.name);
  const [validName, setValidName] = useState(false);
  const [description, setDescription] = useState(tonie.description);
  const [thumbnailUrl, setThumbnailUrl] = useState(tonie.thumbnailUrl);
  const [imageUrl, setImageUrl] = useState(tonie.imageUrl);
  const [isOnWishlist, setIsOnWishlist] = useState(tonie.isOnWishlist);

  const canSave = Boolean(name) && !isLoading;

  useValidateName(name, setValidName);
  useHandleTonieSuccess(
    isSuccess,
    isDelSuccess,
    navigate,
    setName,
    setDescription,
    setThumbnailUrl,
    setImageUrl,
    setIsOnWishlist
  );

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveExistingTonie(
      updateTonie,
      tonie,
      name,
      description,
      thumbnailUrl,
      imageUrl,
      isOnWishlist
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.TONIE.updated);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    const result = await handleDeleteTonie(deleteTonie, tonie.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.TONIE.deleted);
    }
  }

  const modalContent = (
    <EditTonieFormTable
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

export default EditTonieForm;
