import { useState } from 'react';
import { useGetLegoQuery } from '../../api/legoApiSlice';
import Spinner from '../../../../../components/common/Spinner';
import LegoListTable from './LegoListTable';
import LegoFormEdit from '../LegoEdit/LegoFormEdit';
import LegoNewForm from '../LegoNew/LegoFormNew';
import LegoDetails from '../LegoDetails/LegoDetails';

function LegoList() {
  const {
    data: lego,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLegoQuery('legoList', {
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
    content = <LegoListTable lego={lego} openModal={openModal} />;
  }

  const legoList = (
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
            <LegoNewForm isOpen={isModalOpen} onClose={closeModal} />
          ))}
      </div>
    </>
  );

  return legoList;
}

export default LegoList;
