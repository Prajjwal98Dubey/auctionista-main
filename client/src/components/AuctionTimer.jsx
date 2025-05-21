import { useEffect, useRef, useState } from "react";

const AuctionTimer = ({ time }) => {
  const [mintues, setMinutes] = useState(time.split("-")[0]);
  const [seconds, setSeconds] = useState(time.split("-").at(-1));
  const timeDisplayFormat = (givenTime) => {
    return givenTime.length === 1 ? "0" + givenTime : givenTime;
  };
  const secondIntervalRef = useRef(null);
  useEffect(() => {
    if (!secondIntervalRef.current) {
      secondIntervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (parseInt(prev) == 0) return "59";
          else return timeDisplayFormat((parseInt(prev) - 1).toString());
        });
      }, 1000);
    }
    if (secondIntervalRef.current && parseInt(seconds) == 59) {
      setMinutes((prev) => timeDisplayFormat((parseInt(prev) - 1).toString()));
    }
    if (parseInt(seconds) == 0 && parseInt(mintues) == 0) {
      clearInterval(secondIntervalRef.current);
    }
  }, [seconds]);
  useEffect(() => {
    return () => {
      if (secondIntervalRef.current) {
        clearInterval(secondIntervalRef.current);
      }
    };
  }, []);
  return (
    <div className="w-fit h-fit px-3 py-1 rounded-[26px] bg-red-600 text-white font-semibold flex text-[14px] font-kanit">
      <div className="px-1">{mintues} minutes</div>
      <div>{seconds} seconds</div>
    </div>
  );
};

export default AuctionTimer;
