import {getRandomInteger} from "../utils/common";
import AbstractView from "./AbstractView";
import {UpdateType} from "../const";

const createFilters = (filters, activeFilter, elementsInFilterCounter) => {
  const getFilters = () => {
    let sum = ``;
    for (let key in filters) {
      sum += `
        <div class="trip-filters__filter">
          <input ${elementsInFilterCounter(filters[key]) === 0 ? `disabled` : ``} ${filters[key] === activeFilter ? `checked` : ``} id="filter-${filters[key]}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${filters[key]}">
          <label class="trip-filters__filter-label" for="filter-${filters[key]}">${key}</label>
        </div>
    `;
    }
    return sum;
  };

  return `
 <form class="trip-filters" action="#" method="get">
        ${getFilters()}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
    `;
};


export default class Filters extends AbstractView {
  constructor(filters, activeFilter, counter) {
    super();
    this._filters = filters;
    this._activeFilter = activeFilter;
    this._elementsInFilterCounter = counter;
    this._filterHandler = this._filterHandler.bind(this);
  }

  getTemplate() {
    return createFilters(this._filters, this._activeFilter, this._elementsInFilterCounter);
  }

  setFilterHandler(cb) {
    this._callback.filterChange = cb;
    const filterInputs = document.querySelectorAll(`.trip-filters__filter-input`);
    Array.from(filterInputs).forEach((filterInput) => {
      filterInput.addEventListener(`click`, this._filterHandler);
    });
  }

  _filterHandler(evt) {
    evt.preventDefault();
    this._callback.filterChange(UpdateType.MAJOR, evt.target.value);
  }
}


