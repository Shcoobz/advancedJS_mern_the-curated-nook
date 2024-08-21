import { TableAboveHeader } from './TableComponents';
import NoResults from './NoResults';

function ConditionalList({ ids, descriptionText, onWishlistClick, onHomeClick, table }) {
  const header = (
    <TableAboveHeader
      descriptionText={descriptionText}
      actionOnClick={onWishlistClick || onHomeClick}
      isWishlist={!!onWishlistClick}
    />
  );

  return (
    <div>
      {header}
      {ids.length > 0 ? table : <NoResults />}
    </div>
  );
}

export default ConditionalList;
