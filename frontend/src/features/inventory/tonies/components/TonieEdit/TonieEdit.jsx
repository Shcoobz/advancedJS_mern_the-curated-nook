import { useParams } from 'react-router-dom';
import { useGetToniesQuery } from '../../api/toniesApiSlice';
import TonieFormEdit from './TonieFormEdit';
import Spinner from '../../../../../components/common/Spinner';

function TonieEdit() {
  const { id } = useParams();

  const { tonie } = useGetToniesQuery('toniesList', {
    selectFromResult: ({ data }) => ({
      tonie: data?.entities[id],
    }),
  });

  if (!tonie) return <Spinner />;

  const content = <TonieFormEdit tonie={tonie} />;

  return content;
}

export default TonieEdit;
