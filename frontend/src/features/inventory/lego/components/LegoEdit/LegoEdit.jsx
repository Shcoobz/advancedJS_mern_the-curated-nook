import { useParams } from 'react-router-dom';
import { useGetLegoQuery } from '../../api/legoApiSlice';
import Spinner from '../../../../../components/common/Spinner';
import LegoFormEdit from './LegoFormEdit';

function LegoEdit() {
  const { id } = useParams();

  const { lego } = useGetLegoQuery('legoList', {
    selectFromResult: ({ data }) => ({
      lego: data?.entities[id],
    }),
  });

  if (!lego) return <Spinner />;

  const content = <LegoFormEdit lego={lego} />;

  return content;
}

export default LegoEdit;
