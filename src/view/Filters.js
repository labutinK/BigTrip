import {createElement, getRandomInteger} from "../utils";
const createFilters = (filters) => {
  const getFilters = () => {
    return filters.reduce((sum, cur) => {
      let checked = cur.checked ? `checked` : ``;
      let id = cur.name.toLowerCase() + `_` + getRandomInteger(1000, 10000);

      return sum + `<div class="trip-filters__filter">
      <input id="filter-${id}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${cur.value}" ${checked}>
      <label class="trip-filters__filter-label" for="filter-${id}">${cur.label}</label>
    </div>`;
    }, ``);
  };

  return `
 <form class="trip-filters" action="#" method="get">
        ${getFilters()}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
    `;
};


export default class Filters {
  constructor(points) {
    this._element = null;
    this._filters = points;
  }

  getTemplate() {
    return createFilters(this._filters);
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


