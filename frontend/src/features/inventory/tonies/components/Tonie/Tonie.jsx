import { useGetToniesQuery } from '../../api/toniesApiSlice';
import { useGetToniesOnWishlistQuery } from '../../api/tonieWishlistApiSlice';
import TonieTable from './TonieTable';

function Tonie({ tonieId, onEdit, index, isWishlist = false }) {
  const { tonie: inventoryTonie } = useGetToniesQuery('toniesList', {
    selectFromResult: ({ data }) => ({
      tonie: data?.entities[tonieId],
    }),
  });

  const { tonie: wishlistTonie } = useGetToniesOnWishlistQuery('wishlistTonies', {
    selectFromResult: ({ data }) => ({
      tonie: data?.entities[tonieId],
    }),
  });

  const tonie = isWishlist ? wishlistTonie : inventoryTonie;
  
  if (!tonie) return null;

  const content = <TonieTable tonie={tonie} onEdit={onEdit} index={index} />;

  return content;
}

export default Tonie;
