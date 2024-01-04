import AbstractView from "./AbstractView";

const SORTS = {
  date: `sort-day`,
  time: `sort-time`,
  price: `sort-price`,
};
const createSorts = () => {
  return `
  <form class="trip-events__trip-sort trip-sort" action="#" method="get">
        <div class="trip-sort__item  trip-sort__item--day">
          <input id="sort-day" class="trip-sort__input  visually-hidden" data-value="sort-day" type="radio" name="trip-sort" value="sort-day" checked>
          <label class="trip-sort__btn" for="sort-day">Day</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--event">
          <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
          <label class="trip-sort__btn" for="sort-event">Event</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--time">
          <input id="sort-time" class="trip-sort__input  visually-hidden" data-value="sort-time"  type="radio" name="trip-sort" value="sort-time">
          <label class="trip-sort__btn" for="sort-time">Time</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--price">
          <input id="sort-price" class="trip-sort__input  visually-hidden"  data-value="sort-price" type="radio" name="trip-sort" value="sort-price">
          <label class="trip-sort__btn" for="sort-price">Price</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--offer">
          <input id="sort-offer" class="trip-sort__input  visually-hidden" data-value="sort-offer"  type="radio" name="trip-sort" value="sort-offer" disabled>
          <label class="trip-sort__btn" for="sort-offer">Offers</label>
        </div>
      </form>
    `;
};

export default class Sorts extends AbstractView {
  constructor() {
    super();
    this.setResortHandler = this.setResortHandler.bind(this);
    this._resortHandler = this._resortHandler.bind(this);
    this._currentSort = SORTS.date;
  }

  _resortHandler(evt) {
    evt.preventDefault();
    const chosenSort = evt.target.getAttribute(`data-value`);
    const sortName = Object.entries(SORTS).find(([sortName, sortValue]) => chosenSort === sortValue);
    this._callback.resort(sortName[0]);
  }

  setResortHandler(cb) {
    this._callback.resort = cb;
    this.getElement().querySelector(`.trip-sort__item`).parentNode.addEventListener(`change`, this._resortHandler);
  }

  getTemplate() {
    return createSorts();
  }
}
