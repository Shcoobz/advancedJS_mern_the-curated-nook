import {
  TableItemDetail,
  TableItemDetailHeader,
  TableItemDetailImage,
} from '../../../../../components/common/TableComponents';
import useAuth from '../../../../../hooks/useAuth';

import stockImageTonie from '../../../../../img/stockimageTonie.png';
import EntityDetailsTable from '../../../../entity/components/EntityDetails/EntityDetailsTable';

function TonieDetailsTable({ tonie, onClose, handleEditClick, handleDelete }) {
  // const { isSuperuser, isAdmin } = useAuth();
  // const isProtected = isSuperuser || isAdmin;

  // const hasValidImageUrl = tonie.imageUrl && tonie.imageUrl !== 'N/A';
  // const hasValidThumbnailUrl = tonie.thumbnailUrl && tonie.thumbnailUrl !== 'N/A';

  // const imageUrl = hasValidImageUrl
  //   ? tonie.imageUrl
  //   : hasValidThumbnailUrl
  //   ? tonie.thumbnailUrl
  //   : stockImageTonie;

  // const tableContent = (
  //   <div className='tonie__modal-container'>
  //     <TableItemDetailHeader
  //       title={`Tonie: ${tonie.name}`}
  //       handleEditClick={handleEditClick}
  //       handleDelete={handleDelete}
  //       onClose={onClose}
  //       isProtected={isProtected}
  //     />

  //     <div className='tonie__modal-content'>
  //       <div className='tonie__modal-image'>
  //         <TableItemDetailImage
  //           src={imageUrl}
  //           alt={`Cover of ${tonie.name}`}
  //           titleList={`Cover Image of ${tonie.name}`}
  //           className='tonie__cover-image'
  //         />
  //       </div>

  //       <div className='tonie__modal-info'>
  //         <div className='tonie__modal-details'>
  //           <TableItemDetail label='Title List:' value={tonie.titleList} />
  //         </div>
  //       </div>
  //     </div>
  //     <div className='tonie__modal-description'>
  //       <TableItemDetail label='Description:' value={tonie?.description} />
  //     </div>
  //   </div>
  // );

  // return tableContent;

  const imageConfig = {
    imageUrl: tonie.imageUrl,
    thumbnailUrl: tonie.thumbnailUrl,
    stockImage: stockImageTonie,
    altText: `Cover of ${tonie.name}`,
    titleText: `Cover Image of ${tonie.name}`,
    className: 'tonie__cover-image',
  };

  const details = [{ label: 'Title List:', value: tonie.titleList }];

  return (
    <EntityDetailsTable
      item={tonie}
      onClose={onClose}
      handleEditClick={handleEditClick}
      handleDelete={handleDelete}
      type='tonie'
      imageConfig={imageConfig}
      details={details}
      description={tonie.description}
    />
  );
}

export default TonieDetailsTable;
