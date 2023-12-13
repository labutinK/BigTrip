import {createTripPoint} from "./TripPoint";

export const createTripPointsList = (pointsCount) => {
  // Начало списка
  let tripPointsList = `<ul class="trip-events__list">`;

  // Добавляем каждую точку маршрута в список
  for (let i = 0; i < pointsCount; i++) {
    tripPointsList += createTripPoint(i);
  }

  // Конец списка
  tripPointsList += `</ul>`;

  return tripPointsList;
};

