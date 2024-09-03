import { useGetToniesOnWishlistQuery } from '../../api/tonieWishlistApiSlice';
import TonieWishlistTable from './TonieWishlistTable';
import TonieFormEdit from '../TonieEdit/TonieFormEdit';
import TonieDetails from '../TonieDetails/TonieDetails';
import TonieFormNew from '../TonieNew/TonieFormNew';
import EntityWishlist from '../../../../entity/Components/EntityWishlist/EntityWishlist';

function TonieWishlist() {
  return (
    <EntityWishlist
      entityName='tonie'
      useGetWishlistQuery={useGetToniesOnWishlistQuery}
      WishlistTable={TonieWishlistTable}
      FormEdit={TonieFormEdit}
      FormNew={TonieFormNew}
      Details={TonieDetails}
    />
  );
}

export default TonieWishlist;
