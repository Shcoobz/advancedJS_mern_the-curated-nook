import Tonie from '../Tonie/Tonie';
import Spinner from '../../../../components/common/Spinner';
import { useGetToniesQuery } from '../api/toniesApiSlice';
import { UI } from '../../../../config/common/messages';

function ToniesList() {
  const {
    data: tonies,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetToniesQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) return <Spinner />;

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = tonies;

    const tableContent = ids?.length
      ? ids.map((tonieId) => <Tonie key={tonieId} tonieId={tonieId} />)
      : null;

    content = (
      <div>
        <p className='table-description'>{UI.BS.PAGE.TONIE.list.paragraph}</p>
        <br />
        <table className='table table--tonies'>
          <thead className='table__thead'>
            <tr>
              <th scope='col' className='table__th tonie__name'>
                Name
              </th>
              <th scope='col' className='table__th tonie__description'>
                Description
              </th>
              <th scope='col' className='table__th tonie__action'>
                Edit
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return content;
}

export default ToniesList;
