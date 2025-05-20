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

export const auctionDateTag = (date) => {
  const dateTime = new Date(date).getTime();
  const timeDiff = Date.now() - dateTime;
  if (timeDiff < 0)
    return { tag: "Scheduled", color: "from-green-400 to-green-500" };
  else if (timeDiff / (1000 * 60 * 60) <= 1)
    return { tag: "Ongoing", color: "from-purple-400 to-purple-500" };
  else if (timeDiff > 0)
    return { tag: "Ended", color: "from-red-400 to-red-500" };
};

export const isAuctionStart = (time) => {
  const timeDiff = Date.now() - new Date(time).getTime();
  const hours = timeDiff / (1000 * 60 * 60);
  if (hours >= 0 && hours < 1) {
    return true;
  }
  return false;
};
