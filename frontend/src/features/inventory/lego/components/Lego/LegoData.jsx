import { useGetLegoQuery } from '../../api/legoApiSlice';
import { useGetLegoOnWishlistQuery } from '../../api/legoWishlistApiSlice';
import LegoTable from './LegoTable';

function LegoData({ legoId, onEdit, index, isWishlist }) {
  const { lego: inventoryLego } = useGetLegoQuery('legoList', {
    selectFromResult: ({ data }) => ({
      lego: data?.entities[legoId],
    }),
  });

  const { lego: wishlistLego } = useGetLegoOnWishlistQuery('wishlistLego', {
    selectFromResult: ({ data }) => ({
      lego: data?.entities[legoId],
    }),
  });

  const lego = isWishlist ? wishlistLego : inventoryLego;

  if (!lego) return null;

  const content = <LegoTable lego={lego} onEdit={onEdit} index={index} />;

  return content;
}

export default LegoData;
