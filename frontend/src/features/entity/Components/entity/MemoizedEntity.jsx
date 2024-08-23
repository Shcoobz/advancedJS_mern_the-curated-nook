import { memo } from 'react';
import UserData from '../../../users/components/User/UserData';
import BookData from '../../../inventory/books/components/Book/BookData';
import LegoData from '../../../inventory/lego/components/Lego/LegoData';
import TonieData from '../../../inventory/tonies/components/Tonie/TonieData';

const dataComponents = {
  user: UserData,
  book: BookData,
  lego: LegoData,
  tonie: TonieData,
};

function EntityWrapper({ type, id, onEdit, index, isWishlist = false }) {
  const DataComponent = dataComponents[type];

  if (!DataComponent) {
    console.error(`No component found for type: ${type}`);
    return null;
  }

  const props = {
    [`${type}Id`]: id,
    onEdit,
    index,
    ...(type !== 'user' && { isWishlist }),
  };

  return <DataComponent {...props} />;
}

const MemoizedEntity = memo(EntityWrapper);

export default MemoizedEntity;
