export const convertDateToUsageTime = (date) => {
  const diffTime = Date.now() - new Date(date).getTime();
  let hours = Math.floor(diffTime / (1000 * 60 * 60));
  let days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  let months = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
  let year = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30 * 12));
  if (days === 0) return `${hours} hours`;
  else if (months === 0) return `${days} days`;
  else if (year === 0) return `${months} months`;
  return `${year} year`;
};
