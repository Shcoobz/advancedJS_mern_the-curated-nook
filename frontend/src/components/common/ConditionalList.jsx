import { TableAboveHeader } from './TableComponents';
import NoResults from './NoResults';

function ConditionalList({
  ids,
  descriptionText,
  onCreateClick,
  onWishlistClick,
  onHomeClick,
  table,
  createButtonText = 'New',
  isProtected,
}) {
  const header = (
    <TableAboveHeader
      descriptionText={descriptionText}
      onCreateClick={onCreateClick}
      actionOnClick={onWishlistClick || onHomeClick}
      createButtonText={createButtonText}
      isWishlist={!!onWishlistClick}
      isProtected={isProtected}
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
