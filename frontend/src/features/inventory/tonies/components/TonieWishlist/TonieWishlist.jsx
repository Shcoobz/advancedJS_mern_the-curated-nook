import { useState } from 'react';
import { useGetToniesOnWishlistQuery } from '../../api/toniesApiSlice';
import Spinner from '../../../../../components/common/Spinner';
import TonieWishlistTable from './TonieWishlistTable';
import TonieFormEdit from '../TonieEdit/TonieFormEdit';
import TonieDetails from '../TonieDetails/TonieDetails';
import TonieFormNew from '../TonieNew/TonieFormNew';

function TonieWishlist() {
  const {
    data: tonieWishlist,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetToniesOnWishlistQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTonie, setSelectedTonie] = useState(null);

  let content;

  function openModal(tonie = null) {
    setSelectedTonie(tonie);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedTonie(null);
  }

  if (isLoading) return <Spinner />;

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    content = <TonieWishlistTable tonies={tonieWishlist} openModal={openModal} />;
  }

  const tonieWishlistContent = (
    <>
      <div>
        {content}
        {isModalOpen &&
          (selectedTonie ? (
            selectedTonie.isEditing ? (
              <TonieFormEdit
                tonie={selectedTonie}
                isOpen={isModalOpen}
                onClose={closeModal}
              />
            ) : (
              <TonieDetails
                tonie={selectedTonie}
                isOpen={isModalOpen}
                onClose={closeModal}
                onEdit={openModal}
              />
            )
          ) : (
            <TonieFormNew isOpen={isModalOpen} onClose={closeModal} />
          ))}
      </div>
    </>
  );

  return tonieWishlistContent;
}

export default TonieWishlist;
