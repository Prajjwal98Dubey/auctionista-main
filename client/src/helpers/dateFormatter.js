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
  else if (timeDiff / (1000 * 60 * 60) < 1)
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

export const isAuctionOver = (time) => {
  const timeDiff = (Date.now() - new Date(time).getTime()) / (1000 * 60 * 60);
  if (timeDiff >= 1) return true;
  return false;
};

export const bidLeftTime = (time) => {
  const givenTimeMs = new Date(time).getTime();
  const ONE_HOUR_MS = 60 * 60 * 1000;
  const endTime = givenTimeMs + ONE_HOUR_MS;
  const currentTime = Date.now();
  const timeLeft = endTime - currentTime;

  if (timeLeft <= 0) return "00-00";

  const minutes = Math.floor(timeLeft / (60 * 1000));
  const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}-${formattedSeconds}`;
};
