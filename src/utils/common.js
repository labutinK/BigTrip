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
