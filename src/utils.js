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

export const isSameDate = function (date1, date2) {
  return date1.diff(date2, `minute`, true) === 0;
};


export const DOM_POSITIONS = {
  BEFOREBEGIN: `beforebegin`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

/**
 * Вставляет DOM-элемент в указанное место в контейнере.
 *
 * @param {HTMLElement} container - Контейнер, куда будет вставлен элемент.
 * @param {HTMLElement} element - Элемент, который необходимо вставить.
 * @param {string} position - Позиция отрисовки (beforebegin, afterbegin, beforeend, afterend).
 */
export const renderElement = function (container, element, position) {
  switch (position) {
    case DOM_POSITIONS.BEFOREBEGIN:
      container.before(element);
      break;
    case DOM_POSITIONS.AFTERBEGIN:
      container.prepend(element);
      break;
    case DOM_POSITIONS.BEFOREEND:
      container.appendChild(element);
      break;
    case DOM_POSITIONS.AFTEREND:
      container.after(element);
      break;
    default:
      throw new Error(`Unknown position: ${position}`);
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template.trim();

  return newElement.firstChild;
};
