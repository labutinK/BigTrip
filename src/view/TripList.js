// import {createTripPoint} from "./TripPoint";
// import {tripPointForm} from "./newTripPointForm";
// import {generatePoint} from "../mock/point";
import {createElement} from "../utils";

const createTripPointsList = () => {

  return `<ul class="trip-events__list"></ul>`;

  // добавляем форму в список
  // if (displayForm) {
  //   tripPointsList += tripPointForm(generatePoint(true));
  // }
  //
  // // Добавляем каждую точку маршрута в список
  // for (let i = 0; i < points.length; i++) {
  //   // временно выводим форму для редактирования для первого элемента
  //   if (i === 0) {
  //     tripPointsList += tripPointForm(points[i]);
  //   } else {
  //     tripPointsList += createTripPoint(points[i]);
  //   }
  // }

};


export default class TripList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripPointsList();
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
