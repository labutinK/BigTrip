import AbstractView from "./AbstractView";
import {SORT_TYPES} from "../const";

const createSorts = (currentSort) => {
  const isChecked = (sort) => {
    return sort === currentSort ? `checked` : ``;
  };
  return `
  <form class="trip-events__trip-sort trip-sort" action="#" method="get">
        <div class="trip-sort__item  trip-sort__item--day">
          <input id="sort-day" class="trip-sort__input  visually-hidden" data-sort-type="${SORT_TYPES.date}" type="radio" name="trip-sort" value="sort-day" ${isChecked(SORT_TYPES.date)}>
          <label class="trip-sort__btn" for="sort-day">Day</label>
        </div>
        <div class="trip-sort__item  trip-sort__item--event">
          <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
          <label class="trip-sort__btn" for="sort-event">Event</label>
        </div>
        <div class="trip-sort__item  trip-sort__item--time">
          <input id="sort-time" class="trip-sort__input  visually-hidden" data-sort-type="${SORT_TYPES.time}"  type="radio" name="trip-sort" value="sort-time" ${isChecked(SORT_TYPES.time)}>
          <label class="trip-sort__btn" for="sort-time">Time</label>
        </div>
        <div class="trip-sort__item  trip-sort__item--price">
          <input id="sort-price" class="trip-sort__input  visually-hidden"  data-sort-type="${SORT_TYPES.price}" type="radio" name="trip-sort" value="sort-price" ${isChecked(SORT_TYPES.price)}>
          <label class="trip-sort__btn" for="sort-price">Price</label>
        </div>
        <div class="trip-sort__item  trip-sort__item--offer">
          <input id="sort-offer" class="trip-sort__input  visually-hidden"  type="radio" name="trip-sort" value="sort-offer" disabled>
          <label class="trip-sort__btn" for="sort-offer">Offers</label>
        </div>
      </form>
    `;
};

export default class Sorts extends AbstractView {
  constructor(currentSort) {
    super();
    this._currentSort = currentSort;
    this._newSortHandler = this._newSortHandler.bind(this);
  }

  _newSortHandler(evt) {
    evt.preventDefault();
    const chosenSort = evt.target.getAttribute(`data-sort-type`);
    this._callback.newSort(chosenSort);
  }

  setResortHandler(cb) {
    this._callback.newSort = cb;
    this.getElement().querySelector(`.trip-sort__item`).parentNode.addEventListener(`change`, this._newSortHandler);
  }

  getTemplate() {
    return createSorts(this._currentSort);
  }
}
