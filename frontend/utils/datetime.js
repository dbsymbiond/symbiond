const MONTH_NAMES = [
  "Prima", "Duon", "Trine", "Quadra", "Penta", "Hexis", "Septa", "Octus",
  "Ennea", "Deca", "Primadeca", "Duodeca", "Trideca", "Quadradeca", "Pentadeca",
  "Nexus"
];

const getOrdinalSuffix = (day) => {
  if (day % 10 === 1 && day % 100 !== 11) return `${day}st`;
  if (day % 10 === 2 && day % 100 !== 12) return `${day}nd`;
  if (day % 10 === 3 && day % 100 !== 13) return `${day}rd`;
  return `${day}th`;
};

export const getFormattedDateTime = (date, time) => {
  return {
    date: `${MONTH_NAMES[date.month - 1]} ${getOrdinalSuffix(date.day)}, ${date.year} A.F.`,
    time: `${time}`
  };
}