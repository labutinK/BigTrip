import {displayDate, displayDateDiff} from "../utils/date";
import AbstractView from "./AbstractView";

const createTripPoint = (point) => {

  const favoriteClassName = point.isFavorite ? `event__favorite-btn--active` : ``;

  const getOffers = () => {
    let str = ``;
    if (point.offers.length > 0) {
      str += `<ul class="event__selected-offers">`;
      for (let i = 0; i < point.offers.length; i++) {
        str += `
            <li class="event__offer">
                <span class="event__offer-title">${point.offers[i].name}</span>
                <span class="event__offer-cost">
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${point.offers[i].cost}</span>
                </span>
              </li>
            `;
      }
      str += `</ul>`;
    }
    return str;
  };

  return `
    <li class="trip-events__item">
          <div class="event">
            <time class="event__date" datetime="2019-03-18">${displayDate(point.dateStart, `MMM D`)}</time>
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type.toLowerCase()}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${point.type + ` ` + point.town}</h3>
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="2019-03-18T10:30">${displayDate(point.dateStart, `HH-mm`)}</time>
                &mdash;
                <time class="event__end-time" datetime="2019-03-18T11:00">${displayDate(point.dateEnd, `HH-mm`)}</time>
              </p>
              <p class="event__duration">${displayDateDiff(point.dateStart, point.dateEnd, `d h m`)}</p>
            </div>
            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">${point.cost}</span>
            </p>
            <h4 class="visually-hidden">Offers:</h4>
            ${getOffers()}
            <button class="event__favorite-btn ${favoriteClassName}" type="button">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
              </svg>
            </button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
        </li>
    `;
};

export default class TripPoint extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
    this._callback = {};
    this._editPointHandler = this._editPointHandler.bind(this);
  }

  _editPointHandler(evt) {
    evt.preventDefault();
    this._callback.editPointClick();
  }
  setEditOnHandler(cb) {
    this._callback.editPointClick = cb;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editPointHandler);
  }

  getTemplate() {
    return createTripPoint(this._point);
  }
}

