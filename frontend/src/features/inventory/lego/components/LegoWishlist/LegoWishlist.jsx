import { useState } from 'react';
import { useGetLegoOnWishlistQuery } from '../../api/legoWishlistApiSlice';
import Spinner from '../../../../../components/common/Spinner';
import LegoFormEdit from '../LegoEdit/LegoFormEdit';
import LegoDetails from '../LegoDetails/LegoDetails';
import LegoWishlistTable from './LegoWishlistTable';
import LegoFormNew from '../LegoNew/LegoFormNew';

function LegoWishlist() {
  const {
    data: legoWishlist,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLegoOnWishlistQuery('wishlistLego', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLego, setSelectedLego] = useState(null);

  let content;

  function openModal(lego = null) {
    setSelectedLego(lego);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedLego(null);
  }

  if (isLoading) return <Spinner />;

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    content = <LegoWishlistTable lego={legoWishlist} openModal={openModal} />;
  }

  const legoWishlistContent = (
    <>
      <div>
        {content}
        {isModalOpen &&
          (selectedLego ? (
            selectedLego.isEditing ? (
              <LegoFormEdit
                lego={selectedLego}
                isOpen={isModalOpen}
                onClose={closeModal}
              />
            ) : (
              <LegoDetails
                lego={selectedLego}
                isOpen={isModalOpen}
                onClose={closeModal}
                onEdit={openModal}
              />
            )
          ) : (
            <LegoFormNew isOpen={isModalOpen} onClose={closeModal} />
          ))}
      </div>
    </>
  );

  return legoWishlistContent;
}

export default LegoWishlist;
