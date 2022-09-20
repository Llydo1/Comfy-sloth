export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (data, type) => {
  let newData = data.map((single) => single[type]);
  if (type === "colors") newData = newData.flat();
  return ["all", ...new Set(newData)];
};
