import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateUnicNumber = function (num1 = 0, num2 = 1) {
  let prevValues = [];
  return (function () {
    if (prevValues.length === num2 - num1 + 1) {
      return;
    }
    let newNumber = getRandomInteger(num1, num2);
    while (prevValues.includes(newNumber)) {
      newNumber = getRandomInteger(num1, num2);
    }
    prevValues.push(newNumber);
    return newNumber;
  });
};

export const displayDate = function (date, format = `MMMM D`) {
  return dayjs(date).format(format);
};

export const displayDateDiff = function (date1, date2) {
  const diff = date2.diff(date1);
  const dur = dayjs.duration(diff);
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
