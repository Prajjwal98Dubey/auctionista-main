import React, { useEffect, useRef } from "react";

const BidTimer = ({ count, setCount, showTimer, setShowTimer }) => {
  let intervalRef = useRef(null);
  useEffect(() => {
    if (count > 0 && showTimer) {
      intervalRef.current = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [setCount, count, showTimer]);
  useEffect(() => {
    if (count === 0) {
      clearInterval(intervalRef.current);
      setShowTimer(false);
      setCount(3);
    }
}, [count, setShowTimer, setCount]);
  return (
    <>
      <div className="py-2 flex justify-center items-center">
        <div className="text-2xl font-bold">{count}</div>
      </div>
    </>
  );
};

export default BidTimer;
