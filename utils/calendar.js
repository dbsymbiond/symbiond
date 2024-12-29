const MONTH_NAMES = [
  "Prima", "Duon", "Trine", "Quadra", "Penta", "Hexis", "Septa", "Octus",
  "Ennea", "Deca", "Primadeca", "Duodeca", "Trideca", "Quadradeca", "Pentadeca",
  "Nexus"
];
const daysPerMonth = [23, 21, 21, 22, 21, 21, 22, 21, 21, 22, 21, 21, 23, 21, 21, 24];
const WEEKDAY_NAMES = [
  "Primday", "Duday", "Triday", "Quaday", "Penday", "Hexday"
];
const startingWeekday = WEEKDAY_NAMES[4];

const getGameCalendar = (year, month, day) => {
  // Regular Year is 15 months (excluding Nexus)
  // Leap Year is 16 months (including Nexus)
  // a leap year occurs every 9 years. 9,18,27,36,45...
  const isLeapYear = year % 9 === 0;
  // find the days passed in the current year
  let currentMonthIndex = month - 1;
  let daysPassedInCurrentYear = 0;
  for (let monthIndex = 0; monthIndex < currentMonthIndex; monthIndex++) {
    daysPassedInCurrentYear += daysPerMonth[monthIndex];
  }
  daysPassedInCurrentYear = daysPassedInCurrentYear + day - 1;

  let weekdayIndex = WEEKDAY_NAMES.indexOf(startingWeekday);
  let leapYearsPassed = Math.floor(year / 9);
  let regularYearsPassed = year - leapYearsPassed;

  if (regularYearsPassed && !isLeapYear) {
    // current day is not in leap year and shouldn't count towards years passed.
    regularYearsPassed -= 1;
  }

  if (isLeapYear) {
    // current day is in a leap year and shouldn't count towards years passed.
    leapYearsPassed -= 1;
  }

  // get the current weekday
  const daysPassedInPreviousYears = ((regularYearsPassed * 322) + (leapYearsPassed * 346));
  const totalDaysPassed = daysPassedInCurrentYear + daysPassedInPreviousYears;

  weekdayIndex = (weekdayIndex + totalDaysPassed) % WEEKDAY_NAMES.length;
  const currentWeekday = WEEKDAY_NAMES[weekdayIndex];
  const currentYearStartIndex = (WEEKDAY_NAMES.indexOf(startingWeekday) + daysPassedInPreviousYears) % WEEKDAY_NAMES.length;

  const calendar = [];
  let dayCount = 0;

  for (let i = 0; i < (isLeapYear ? 16 : 15); i++) {
    const month = {
      name: MONTH_NAMES[i],
      days: []
    };

    for (j = 1; j <= daysPerMonth[i]; j++) {
      month.days.push({
        dayOfMonth: j,
        weekday: WEEKDAY_NAMES[(currentYearStartIndex + dayCount) % WEEKDAY_NAMES.length]
      })
      dayCount++;
    }
    calendar.push(month);
  }

  return {
    currentWeekday: currentWeekday,
    isLeapYear: isLeapYear,
    calendar: calendar
  };
};

module.exports = {
  getGameCalendar
}