import {
  DAYS_PER_MONTH,
  SYMBIOND_EPOCH_MILLISECONDS,
  SYMBIOND_HOURS_PER_EARTH_HOUR,
  SYMBIOND_HOURS_PER_REGULAR_YEAR,
  SYMBIOND_HOURS_PER_LEAP_YEAR
} from "shared";

// get current game progression date
export const getDate = () => {
  const now = new Date();
  const currentUtcMilliseconds = now.getTime();
  const millisecondsSinceEpoch = currentUtcMilliseconds - SYMBIOND_EPOCH_MILLISECONDS;
  const totalSymbiondGameHours = millisecondsSinceEpoch / 3600000 * SYMBIOND_HOURS_PER_EARTH_HOUR;

  // get year
  let year = 1;
  let remainingHours = totalSymbiondGameHours;

  while (remainingHours >= SYMBIOND_HOURS_PER_REGULAR_YEAR) {
    if (year % 9 === 0) {
      remainingHours -= SYMBIOND_HOURS_PER_LEAP_YEAR;
    } else {
      remainingHours -= SYMBIOND_HOURS_PER_REGULAR_YEAR;
    }
    year++;
  }

  let monthDays = DAYS_PER_MONTH;

  if (year % 9 !== 0) {
    monthDays.pop();
  }

  // get month and day
  let month = 1;
  let day = 1;

  for (let i = 0; i < monthDays.length; i++) {
    const hoursInMonth = monthDays[i] * SYMBIOND_HOURS_PER_EARTH_HOUR;

    if (remainingHours >= hoursInMonth) {
      remainingHours -= hoursInMonth;
      month++;
    } else {
      day += Math.floor(remainingHours / SYMBIOND_HOURS_PER_EARTH_HOUR);
      break;
    }
  }

  return { year, month, day }
};

// get current game progression time
export const getTime = () => {
  const now = new Date();
  const utcMilliseconds = now.getTime();
  const symbiondMilliseconds = (utcMilliseconds - SYMBIOND_EPOCH_MILLISECONDS) * SYMBIOND_HOURS_PER_EARTH_HOUR;
  const symbiondDate = new Date(symbiondMilliseconds);
  const hours = Math.floor((symbiondMilliseconds / 1000 / 60 / 60) % 27);
  const minutes = symbiondDate.getUTCMinutes()
  const seconds = symbiondDate.getUTCSeconds();
  const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return timeString;
};