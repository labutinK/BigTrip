import {createTripPoint} from "./TripPoint";
import {tripPointForm} from "./newTripPointForm";
import {generatePoint} from "../mock/point";

export const createTripPointsList = (points, displayForm = false) => {
  // Начало списка
  let tripPointsList = `<ul class="trip-events__list">`;

  // добавляем форму в список
  if (displayForm) {
    tripPointsList += tripPointForm(generatePoint(true));
  }

  // Добавляем каждую точку маршрута в список
  for (let i = 0; i < points.length; i++) {
    // временно выводим форму для редактирования для первого элемента
    if (i === 0) {
      tripPointsList += tripPointForm(points[i]);
    } else {
      tripPointsList += createTripPoint(points[i]);
    }
  }

  // Конец списка
  tripPointsList += `</ul>`;

  return tripPointsList;
};

