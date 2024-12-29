const MONTH_TOTAL_DAYS = [23, 21, 21, 22, 21, 21, 22, 21, 21, 22, 21, 21, 23, 21, 21];
const SYMBIOND_EPOCH_MILLISECONDS = new Date('2000-01-01T00:00:00.000Z').getTime();
const SYMBIOND_HOURS_PER_EARTH_HOUR = 27;
const SYMBIOND_HOURS_PER_REGULAR_YEAR = 8694;
const SYMBIOND_HOURS_PER_LEAP_YEAR = 9342;

// get current game progression date
const getDate = () => {
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

  let monthDays = MONTH_TOTAL_DAYS;

  if (year % 9 === 0) {
    monthDays.push(24);
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
const getTime = () => {
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

module.exports = {
  getDate,
  getTime
}