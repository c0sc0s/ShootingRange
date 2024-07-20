//@ts-ignore
import { BorderBox7 } from "@jiaminghi/data-view-react";
import { useEffect, useState } from "react";
import useAppStore from "../../store";

function getRemainingTime(timestamp) {
  const now = Math.floor(Date.now() / 1000);
  const remainingSeconds = timestamp - now;

  if (isNaN(timestamp) || remainingSeconds < 0) {
    return "00:00:00:00";
  }

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;
  const milliseconds = Math.floor((Date.now() % 1000) / 10);

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedMilliseconds =
    milliseconds < 10 ? `0${milliseconds}` : milliseconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}

const TimeCount = () => {
  const { time } = useAppStore();
  const [timeCount, setTimeCount] = useState(getRemainingTime(time));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeCount(getRemainingTime(time));
    }, 10);

    return () => clearInterval(interval);
  }, [time]);

  const getColor = (remainingSeconds) => {
    const maxSeconds = 86400; // 1 day in seconds
    const ratio = remainingSeconds / maxSeconds;
    const red = Math.floor(255 * (1 - ratio));
    const green = Math.floor(255 * ratio);
    return `rgb(${red}, ${green}, 0)`;
  };

  const remainingSeconds = time - Math.floor(Date.now() / 1000);
  const color = getColor(remainingSeconds);

  return (
    <span className="text-[1.2rem] text-center w-[150px]" style={{ color }}>
      {timeCount}
    </span>
  );
};

const Clock = () => {
  return (
    <div className="mb-4 w-[300px]">
      <BorderBox7>
        <div className="font-custom flex items-center justify-center">
          剩余时间:
          <div className="w-[150px]">
            <TimeCount />
          </div>
        </div>
      </BorderBox7>
    </div>
  );
};

export default Clock;
