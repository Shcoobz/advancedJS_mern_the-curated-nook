import createEntityData from '../../../../entity/Components/Entity/createEntityData';
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
