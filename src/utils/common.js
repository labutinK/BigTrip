import dayjs from "dayjs";

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
export const isEvtEscape = (evt) => {
  evt = evt || window.event;
  return (evt.key === `Escape` || evt.key === `Esc`);
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};


const getWeightForNullDate = (a, b) => {
  if (a === null && b === null) {
    return 0;
  }

  if (a === null) {
    return 1;
  }

  if (b === null) {
    return -1;
  }

  return null;
};

const getWeghtForEmpty = (a, b)=> {
  if (a !== null && b !== null) {
    return 0;
  }
  if (a !== null) {
    return -1;
  }
  if (b !== null) {
    return 1;
  }
  return null;
};

export const sortDate = (a, b) => {
  const weight = getWeightForNullDate(a.dateStart, b.dateStart);
  if (weight !== null) {
    return weight;
  }
  return dayjs(b.dateStart).isBefore(a.dateStart, `minute`);
};

export const sortDuration = (a, b) => {
  const weightA = getWeightForNullDate(a.dateStart, a.dateEnd);
  const weightB = getWeightForNullDate(b.dateStart, b.dateEnd);
  const weight = getWeghtForEmpty(weightA, weightB);
  if (weight !== null) {
    return weight;
  }
  return dayjs(a.dateStart).diff(dayjs(a.dateEnd), `minute`) - dayjs(b.dateStart).diff(dayjs(b.dateEnd), `minute`);
};

export const sortCost = (a, b) => {
  const weight = getWeightForNullDate(a.cost, b.cost);
  if (weight !== null) {
    return weight;
  }
  return a.cost < b.cost;
};

