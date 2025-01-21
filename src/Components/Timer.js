import React, { useState, useRef, useEffect } from "react";
import "./Timer.css";

const Timer = ({ isPolling, coffeeon,socket }) => {

  // const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const [timer, setTimer] = useState("00:00");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isCritical,setIsCritical] = useState(false);
  const [isBlinking,setIsBlinking] = useState(false);

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

    let { total, minutes, seconds } = getTimeRemaining(endTime);
    if (total >= 0) {
      setTimer(
        `${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`
      );

      if(total <= 20000) {
        setIsCritical(true);
        setIsBlinking(true);
      } else {
        setIsBlinking(false);
        setIsCritical(false);
      }
    } else {
      setIsBlinking(false);
      setIsCritical(false);
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
    if (isPolling && !coffeeon) {
      // Start the timer when isPolling becomes true
      clearTimer(getDeadTime());
      setIsTimerRunning(true);
    } else if(!isPolling && !coffeeon) {
      // Stop the timer when isPolling becomes false
      if (timerRef.current) clearInterval(timerRef.current);
      setIsTimerRunning(false);
      setTimer("00:00");
      setIsCritical(false);
      setIsBlinking(false);
    }

    // Cleanup function for useEffect
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPolling]); // Trigger effect when isPolling changes

  useEffect(()=>{
    socket.on("freezeTimer",()=>{
      if(timerRef.current) clearInterval(timerRef.current);
      setIsTimerRunning(false);
      setIsBlinking(false);
    });
    return () => {
      socket.off("freezeTimer");
    }
  },[socket]);


  return (
    <div style={{ textAlign: "center", margin: "auto" }}>
      {isPolling ? <p className="remaining-time">Remaining Time</p> : ""}
      <h2
        className={`timer ${isCritical ? "critical" : ""} ${isBlinking ? "blinking" : ""}`}
      >
        {timer}
      </h2>
    </div>
  );
};

export default Timer;



