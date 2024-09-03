import createEntityData from '../../../../entity/components/Entity/createEntityData';
import { useGetLegoQuery } from '../../api/legoApiSlice';
import { useGetLegoOnWishlistQuery } from '../../api/legoWishlistApiSlice';
import LegoTable from './LegoTable';

const LegoData = createEntityData(
  useGetLegoQuery,
  useGetLegoOnWishlistQuery,
  LegoTable,
  'legoList',
  'wishlistLego'
);

export default LegoData;
