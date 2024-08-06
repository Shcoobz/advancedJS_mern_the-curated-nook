import { useState } from 'react';
import { useGetToniesQuery } from '../../api/toniesApiSlice';
import Spinner from '../../../../../components/common/Spinner';
import ToniesListTable from './ToniesListTable';

import TonieFormEdit from '../TonieEdit/TonieFormEdit';
import TonieDetails from '../TonieDetails/TonieDetails';
import TonieFormNew from '../TonieNew/TonieFormNew';

function ToniesList() {
  const {
    data: tonies,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetToniesQuery(undefined, {
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
    content = <ToniesListTable tonies={tonies} openModal={openModal} />;
  }

  const toniesList = (
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

  return toniesList;
}

export default ToniesList;
