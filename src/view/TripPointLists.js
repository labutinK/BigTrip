import {createTripPoint} from "./TripPoint";

export const createTripPointsList = (points) => {
  // Начало списка
  let tripPointsList = `<ul class="trip-events__list">`;

  // Добавляем каждую точку маршрута в список
  for (let i = 0; i < points.length; i++) {
    tripPointsList += createTripPoint(points[i]);
  }

  // Конец списка
  tripPointsList += `</ul>`;

  return tripPointsList;
};

