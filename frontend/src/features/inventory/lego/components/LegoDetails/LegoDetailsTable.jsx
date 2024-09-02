import { isUUID } from '../../../../utils/formUtils';
import stockImageLego from '../../../../../img/stockimageLego.png';
import EntityDetailsTable from '../../../../entity/Components/EntityDetails/EntityDetailsTable';

function LegoDetailsTable({ lego, onClose, handleEditClick, handleDelete }) {
  const displaySetNumber = isUUID(lego.setNumber) ? 'N/A' : lego.setNumber;

  const imageConfig = {
    imageUrl: lego.imageUrl,
    thumbnailUrl: lego.thumbnailUrl,
    stockImage: stockImageLego,
    altText: `Cover of ${lego.title}`,
    titleText: `Cover Image of ${lego.title}`,
    className: 'lego__cover-image',
  };

  const details = [
    { label: 'Set number:', value: displaySetNumber },
    { label: 'Theme ID:', value: lego.themeId },
    { label: 'Theme name:', value: lego.themeName },
    { label: 'Year:', value: lego.year },
  ];

  const tableContent = (
    <EntityDetailsTable
      item={lego}
      onClose={onClose}
      handleEditClick={handleEditClick}
      handleDelete={handleDelete}
      type='lego'
      imageConfig={imageConfig}
      details={details}
    />
  );

  return tableContent;
}

export default LegoDetailsTable;
