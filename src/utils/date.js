import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const getDateInFormat = function (date, format = `MMMM D`) {
  if (date === null) {
    return ``;
  }
  return dayjs(date).format(format);
};

export const getDateDiffInMinutes = function (date1, date2) {
  if (date1 === null || date2 === null) {
    return null;
  }
  return date2.diff(date1, `minute`);
};

export const getDateInDHMFormat = function (dur) {
  if (dur === null) {
    return null;
  }
  const days = dur.days();
  const hours = dur.hours();
  const minutes = dur.minutes();
  let result = ``;

  if (days > 0) {
    result += `${days}D `;
  }
  if (hours > 0 || days > 0) {
    result += `${hours}H `;
  }
  result += `${minutes}M`;
  return result;
};
export const getDateDiff = function (date1, date2) {
  if (date1 === null || date2 === null) {
    return null;
  }
  const diff = date2.diff(date1);
  return dayjs.duration(diff);
};

export const isSameDate = function (date1, date2) {
  return date1.diff(date2, `minute`, true) === 0;
};

export function formatDateFromMintutes(minutesTotal) {
  const minutesInDay = 60 * 24;
  const minutesInHour = 60;

  const days = Math.floor(minutesTotal / minutesInDay);
  const hours = Math.floor((minutesTotal % minutesInDay) / minutesInHour);
  const minutes = minutesTotal % minutesInHour;

  let result = ``;
  if (days > 0) {
    result += `${days}D `;
  }
  if (hours > 0) {
    result += `${hours}H `;
  }
  result += `${minutes}M`;

  return result.trim();
}
