"use client";

import React, { useEffect, useState } from "react";

const EmailOtp = ({ futureTime, currentTime }) => {
  const futureDate = new Date(futureTime);
  const currentDate = new Date(currentTime);

  const [timeLeft, setTimeLeft] = useState(() => futureDate - currentDate);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("first");
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTimeLeft - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <p className="text-md text-green-500">{formatTime(timeLeft)}</p>
    </>
  );
};

export default EmailOtp;
