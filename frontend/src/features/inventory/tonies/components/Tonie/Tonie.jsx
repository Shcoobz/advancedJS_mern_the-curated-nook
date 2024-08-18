import { useSelector } from 'react-redux';
import { selectTonieById } from '../../api/toniesApiSlice';
import TonieTable from './TonieTable';
import { selectWishlistTonieById } from '../../api/tonieWishlistApiSlice';

function Tonie({ tonieId, onEdit, index, isWishlist = false }) {
  const selectTonie = isWishlist ? selectWishlistTonieById : selectTonieById;

  const tonie = useSelector((state) => {
    const selected = selectTonie(state, tonieId);

    return selected;
  });

  if (!tonie) return null;

  const content = <TonieTable tonie={tonie} onEdit={onEdit} index={index} />;

  return content;
}

export default Tonie;
