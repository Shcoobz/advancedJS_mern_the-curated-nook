import { useGetLegoOnWishlistQuery } from '../../api/legoWishlistApiSlice';
import LegoFormEdit from '../LegoEdit/LegoFormEdit';
import LegoDetails from '../LegoDetails/LegoDetails';
import LegoWishlistTable from './LegoWishlistTable';
import LegoFormNew from '../LegoNew/LegoFormNew';
import EntityWishlist from '../../../../entity/Components/EntityWishlist/EntityWishlist';

function LegoWishlist() {
  return (
    <EntityWishlist
      entityName='lego'
      useGetWishlistQuery={useGetLegoOnWishlistQuery}
      WishlistTable={LegoWishlistTable}
      FormEdit={LegoFormEdit}
      FormNew={LegoFormNew}
      Details={LegoDetails}
    />
  );
}

export default LegoWishlist;
