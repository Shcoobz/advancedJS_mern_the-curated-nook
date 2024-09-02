import { useParams } from 'react-router-dom';
import Spinner from '../../../../components/common/Spinner';

function EntityEdit({ useGetQuery, queryName, EntityFormEdit, entityName }) {
  const { id } = useParams();

  const { [entityName]: entity } = useGetQuery(queryName, {
    selectFromResult: ({ data }) => ({
      [entityName]: data?.entities[id],
    }),
  });

  if (!entity) return <Spinner />;

  const content = <EntityFormEdit {...{ [entityName]: entity }} />;

  return content;
}

export default EntityEdit;
