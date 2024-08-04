import { useState } from 'react';
import { useGetLegoQuery } from '../../api/legoApiSlice';
import Spinner from '../../../../../components/common/Spinner';
import LegoListTable from './LegoListTable';
import EditLegoForm from '../EditLego/EditLegoForm';
import NewLegoForm from '../NewLego/NewLegoForm';
import LegoDetails from '../LegoDetails/LegoDetails';

function LegoList() {
  const {
    data: lego,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLegoQuery(undefined, {
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
              <EditLegoForm
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
            <NewLegoForm isOpen={isModalOpen} onClose={closeModal} />
          ))}
      </div>
    </>
  );

  return legoList;
}

export default LegoList;
