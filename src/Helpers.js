const FormatNumber = (value) => {
  return value.toLocaleString("en-GB", { minimumFractionDigits: 2 });
};

export default FormatNumber;
