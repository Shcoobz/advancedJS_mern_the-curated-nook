function TableCell({ className, content }) {
  return <td className={`table__cell ${className || ''}`}>{content}</td>;
}

export default TableCell;
