const FormatNumber = (value) => {
  return value.toLocaleString("latn", { minimumFractionDigits: 2 });
};

export default FormatNumber;
