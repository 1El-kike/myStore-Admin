export const formatCount = (mony: number) => {
  if (!mony) return "00.00";
  const count = Math.floor(mony);
  return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
