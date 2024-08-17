import { TableAboveHeader } from './TableComponents';
import NoResults from './NoResults';

function ConditionalList({
  ids,
  descriptionText,
  onCreateClick,
  onWishlistClick,
  table,
  createButtonText = 'New',
}) {
  const header = (
    <TableAboveHeader
      descriptionText={descriptionText}
      onCreateClick={onCreateClick}
      onWishlistClick={onWishlistClick}
      createButtonText={createButtonText}
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
