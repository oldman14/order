const formatCurrency = numberFormat => {
  return (
    numberFormat.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'đ'
  );
};
export default formatCurrency;
