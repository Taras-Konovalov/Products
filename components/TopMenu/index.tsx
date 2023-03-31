import React, { FC, useEffect, useState } from "react";
import styles from "./TopMenu.module.css";
import moment from "moment";
const _ = require("lodash");

export const TopMenu: FC = () => {
  const [currentTime, setCurrentTime] = useState(moment().format("HH:mm"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format("HH:mm:ss"));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const dayOfWeek = new Date()
    .toLocaleDateString("en-EN", {
      weekday: "long",
      timeZone: "UTC",
      timeZoneName: "short",
    })
    .replace(", UTC", "");

  const date = new Date().getDate();
  const month = new Date().toLocaleString("en-EN", { month: "long" });
  const year = new Date().getFullYear();

  return (
    <div className={styles.topMenuWrapper}>
      <div className={styles.topMenu}>
        <p className={styles.logo}>Logo</p>
        <div className={styles.dateTime}>
          <div className={styles.dateMonthYear}>
            <span>{_.capitalize(dayOfWeek)}</span>
            <span>{`${date} ${month}, ${year}`}</span>
          </div>
          <span>{currentTime}</span>
        </div>
      </div>
    </div>
  );
};
