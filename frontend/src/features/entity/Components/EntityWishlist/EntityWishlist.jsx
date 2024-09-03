import { useState } from 'react';
import { getPluralEntityName, getSingularEntityName } from '../../../utils/formUtils';
import Spinner from '../../../../components/common/Spinner';

function EntityWishlist({
  entityName,
  useGetWishlistQuery,
  WishlistTable,
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
    data: wishlist,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetWishlistQuery(`${entityName}Wishlist`, queryOptions);

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
    content = (
      <WishlistTable
        {...{ [pluralEntityName.toLowerCase()]: wishlist }}
        openModal={openModal}
      />
    );
  }

  const singularEntityName = getSingularEntityName(entityName);

  const wishlistContent = (
    <>
      <div>
        {content}
        {isModalOpen &&
          (selectedEntity ? (
            selectedEntity.isEditing ? (
              <FormEdit
                {...{ [singularEntityName.toLowerCase()]: selectedEntity }}
                isOpen={isModalOpen}
                onClose={closeModal}
              />
            ) : (
              <Details
                {...{ [singularEntityName.toLowerCase()]: selectedEntity }}
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

  return wishlistContent;
}

export default EntityWishlist;
