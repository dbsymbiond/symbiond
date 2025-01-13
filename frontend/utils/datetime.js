import { MONTH_NAMES } from "./constants/calendar.js";

const getOrdinalSuffix = (day) => {
  if (day % 10 === 1 && day % 100 !== 11) return `${day}st`;
  if (day % 10 === 2 && day % 100 !== 12) return `${day}nd`;
  if (day % 10 === 3 && day % 100 !== 13) return `${day}rd`;
  return `${day}th`;
};

export const getFormattedDateTime = (date, time, i18n) => {
  return {
    date: i18n.t('time.formattedDate', {
      month: MONTH_NAMES[date.month - 1],
      day: getOrdinalSuffix(date.day),
      year: date.year
    }),
    time: i18n.t('time.formattedTime', {
      time: time
    })
  };
}