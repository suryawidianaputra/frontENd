export const trimmedData = (data) => {
  const trim = data.trim();
  return trim.length === 0 ? false : true;
};
