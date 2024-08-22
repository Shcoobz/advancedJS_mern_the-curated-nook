import { memo } from 'react';
import TonieData from './TonieData';

function TonieDataWrapper({ tonieId, onEdit, index, isWishlist = false }) {
  return (
    <TonieData tonieId={tonieId} onEdit={onEdit} index={index} isWishlist={isWishlist} />
  );
}

const Tonie = memo(TonieDataWrapper);

export default Tonie;
