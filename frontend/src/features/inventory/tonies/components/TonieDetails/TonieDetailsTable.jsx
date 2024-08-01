import {
  TableItemDetail,
  TableItemDetailHeader,
} from '../../../../../components/common/TableComponents';

function TonieDetailsTable({ tonie, onClose, handleEditClick, handleDelete }) {
  const tableContent = (
    <>
      <TableItemDetailHeader
        title={`Tonie Details: ${tonie.name}`}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
        onClose={onClose}
      />

      <div className='details'>
        <TableItemDetail label='Name:' value={tonie?.name} />
        <TableItemDetail label='Description:' value={tonie?.description} />
        <TableItemDetail
          label='On Wishlist:'
          value={tonie?.isOnWishlist ? 'Yes' : 'No'}
        />
      </div>
    </>
  );

  return tableContent;
}

export default TonieDetailsTable;
