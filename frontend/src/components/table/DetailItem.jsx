function DetailItem({ label, value }) {
  return (
    <div className='details__group'>
      <label className='details__label'>{label}</label>
      <p className='details__value'>{value}</p>
    </div>
  );
}

export default DetailItem;
