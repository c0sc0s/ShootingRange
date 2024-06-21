import { BorderBox10, BorderBox7 } from "@jiaminghi/data-view-react";
import React, { useState, useEffect } from "react";
import useAppStore from "../../store";
import { useMemo } from "react";

function getRemainingTime(timestamp) {
  const now = Math.floor(Date.now() / 1000);
  const remainingSeconds = timestamp - now;

  if (remainingSeconds < 0) {
    return "00:00";
  }

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}`;
}

const Countdown = () => {
  const { time } = useAppStore();
  const [timeCount, setTimeCount] = useState(getRemainingTime(time));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeCount(getRemainingTime(time));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-4">
      <BorderBox7>
        <div className="font-custom flex items-center justify-center">
          剩余时间:
          <span className="text-red-500 ml-3 text-[1.2rem] text-center">
            {timeCount}
          </span>
        </div>
      </BorderBox7>
    </div>
  );
};

const TimeDown = () => {
  const targetTimestamp = 1718777712;

  return (
    <div className="App">
      <Countdown targetTimestamp={targetTimestamp} />
    </div>
  );
};

export default TimeDown;
