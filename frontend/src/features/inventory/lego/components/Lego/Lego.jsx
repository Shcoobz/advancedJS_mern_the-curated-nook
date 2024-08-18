import { useSelector } from 'react-redux';
import { selectLegoById } from '../../api/legoApiSlice';
import LegoTable from './LegoTable';
import { selectWishlistLegoById } from '../../api/legoWishlistApiSlice';

function Lego({ legoId, onEdit, index, isWishlist = false }) {
  const selectLego = isWishlist ? selectWishlistLegoById : selectLegoById;

  const lego = useSelector((state) => {
    const selected = selectLego(state, legoId);

    return selected;
  });

  if (!lego) return null;

  const content = <LegoTable lego={lego} onEdit={onEdit} index={index} />;

  return content;
}

export default Lego;
