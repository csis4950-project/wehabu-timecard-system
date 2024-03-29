"use client"
import { useState, useEffect } from 'react';
const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Time() {
  const [date, setDate] = useState(null);

  const getTime = () => {
    const newDate = new Date();
    setDate(newDate);
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer">
      {date && <DisplayDate date={date} />}
      {date && <DisplayTime date={date} />}
    </div>
  );
};

function DisplayDate({ date }) {
  const month = date.toLocaleString('default', { month: 'long' })
  const day = date.getDate();
  const dayOfWeek = DAYS_OF_WEEK[date.getDay()]
  return (
    <div className='text'>
      <span className='text--date'>{`${month} ${day} ${dayOfWeek}`}</span>
    </div>
  )
}

function DisplayTime({ date }) {
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <div className='text'>
      <span className='text--time'>{`${hours}:${minutes}:${seconds} ${amOrPm}`}</span>
    </div>
  );
}