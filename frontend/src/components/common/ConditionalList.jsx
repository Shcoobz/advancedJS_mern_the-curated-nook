import { TableDescription } from './TableComponents';
import NoResults from './NoResults';

function ConditionalList({ ids, descriptionText, table }) {
  const header = <TableDescription text={descriptionText} />;

  return (
    <div>
      {header}
      <br />
      {ids.length > 0 ? table : <NoResults />}
    </div>
  );
}

export default ConditionalList;
