import React, { useState, useRef, useEffect } from "react";

const Timer = ({ isPolling, coffeeon }) => {
  const timerRef = useRef(null);
  const [timer, setTimer] = useState("00:00");
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (endTime) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(endTime);
    if (total >= 0) {
      setTimer(
        `${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`
      );
    }
  };

  const clearTimer = (endTime) => {
    if (timerRef.current) clearInterval(timerRef.current);

    startTimer(endTime);

    const id = setInterval(() => {
      startTimer(endTime);
    }, 1000);

    timerRef.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 60);
    return deadline;
  };

  useEffect(() => {
    if (isPolling == 'true' && !coffeeon) {
      // Start the timer when isPolling becomes true
      clearTimer(getDeadTime());
      setIsTimerRunning(true);
    } else if(isPolling == 'false' && !coffeeon) {
      // Stop the timer when isPolling becomes false
      if (timerRef.current) clearInterval(timerRef.current);
      setIsTimerRunning(false);
      setTimer("00:00");
    }

    // Cleanup function for useEffect
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPolling]); // Trigger effect when isPolling changes

  return (
    <div style={{ textAlign: "center", margin: "auto" }}>
      <h2>{timer}</h2>
    </div>
  );
};

export default Timer;
