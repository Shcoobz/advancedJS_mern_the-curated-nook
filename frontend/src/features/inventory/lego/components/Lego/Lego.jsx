import { memo } from 'react';
import LegoData from './LegoData';

function LegoDataWrapper({ legoId, onEdit, index, isWishlist = false }) {
  return (
    <LegoData legoId={legoId} onEdit={onEdit} index={index} isWishlist={isWishlist} />
  );
}

const Lego = memo(LegoDataWrapper);

export default Lego;
