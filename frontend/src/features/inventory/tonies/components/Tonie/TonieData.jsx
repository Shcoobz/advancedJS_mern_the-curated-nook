import createEntityData from '../../../../entity/Components/entity/createEntityData';
import { useGetToniesQuery } from '../../api/toniesApiSlice';
import { useGetToniesOnWishlistQuery } from '../../api/tonieWishlistApiSlice';
import TonieTable from './TonieTable';

const TonieData = createEntityData(
  useGetToniesQuery,
  useGetToniesOnWishlistQuery,
  TonieTable,
  'toniesList',
  'wishlistTonies'
);

export default TonieData;
