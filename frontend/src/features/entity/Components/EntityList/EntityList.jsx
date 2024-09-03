import { useState } from 'react';
import Spinner from '../../../../components/common/Spinner';
import { getPluralEntityName, getSingularEntityName } from '../../../utils/formUtils';

function EntityList({
  entityName,
  useGetQuery,
  ListTable,
  FormEdit,
  FormNew,
  Details,
  queryOptions = {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  },
}) {
  const {
    data: entities,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetQuery(`${entityName}List`, queryOptions);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);

  let content;

  function openModal(entity = null) {
    setSelectedEntity(entity);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedEntity(null);
  }

  if (isLoading) return <Spinner />;

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const pluralEntityName = getPluralEntityName(entityName);

    content = <ListTable {...{ [pluralEntityName]: entities }} openModal={openModal} />;
  }

  const singularEntityName = getSingularEntityName(entityName);

  return (
    <>
      <div>
        {content}

        {isModalOpen &&
          (selectedEntity ? (
            selectedEntity.isEditing ? (
              <FormEdit
                {...{ [singularEntityName]: selectedEntity }}
                isOpen={isModalOpen}
                onClose={closeModal}
              />
            ) : (
              <Details
                {...{ [singularEntityName]: selectedEntity }}
                isOpen={isModalOpen}
                onClose={closeModal}
                onEdit={openModal}
              />
            )
          ) : (
            <FormNew isOpen={isModalOpen} onClose={closeModal} />
          ))}
      </div>
    </>
  );
}

export default EntityList;
