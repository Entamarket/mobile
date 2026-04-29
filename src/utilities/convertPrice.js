const convertPrice = (price) => {
  const priceValue = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);

  return priceValue;
};

export { convertPrice };
