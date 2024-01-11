import {getDateInFormat, getDateDiff, getDateInDHMFormat} from "../utils/date";
import AbstractView from "./AbstractView";
import {offers} from "../mock/consts";
import {createElement} from "../utils/common";

const createTripPoint = (point) => {

  const favoriteClassName = point.isFavorite ? `event__favorite-btn--active` : ``;

  const getOffers = () => {
    let str = ``;
    if (offers.has(point.type) && offers.get(point.type).length > 0) {
      let offersAddedAlready = point.offers;
      let offersForType = offers.get(point.type);
      let actualOffers = offersForType.filter((offer) => {
        for (let addedOffer of offersAddedAlready) {
          if (addedOffer === offer.formName) {
            return true;
          }
        }
        return false;
      });
      str += `<ul class="event__selected-offers">`;
      for (let i = 0; i < actualOffers.length; i++) {
        str += `
            <li class="event__offer">
                <span class="event__offer-title">${actualOffers[i].name}</span>
                <span class="event__offer-cost">
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${actualOffers[i].cost}</span>
                </span>
              </li>
            `;
      }
      str += `</ul>`;
    }
    return str;
  };

  const getDuration = () => {
    const result = getDateInDHMFormat(getDateDiff(point.dateStart, point.dateEnd));
    if (!result) {
      return ``;
    }
    const durationBox = createElement(`<p class="event__duration"></p>`);
    return (durationBox.innerText = result);
  };
  const getDatesBlock = () => {
    const dateFrom = getDateInFormat(point.dateStart, `HH:mm`);
    const dateTo = getDateInFormat(point.dateEnd, `HH:mm`);
    let dateBlockWrapper = `<p class="event__time">`;
    if (dateFrom) {
      dateBlockWrapper += `
      <time class="event__start-time">${dateFrom}</time>`;
    }
    if (dateTo) {
      let dateToBlockWrapper = `
          <time class="event__start-time">${dateTo}</time>
      `;
      if (dateFrom) {
        dateToBlockWrapper = `&mdash;` + dateToBlockWrapper;
      }
      dateBlockWrapper += dateToBlockWrapper;
    }
    dateBlockWrapper += `</p>`;
    return dateBlockWrapper;
  };


  return `
    <li class="trip-events__item">
          <div class="event">
            <time class="event__date" datetime="2019-03-18">${getDateInFormat(point.dateStart, `MMM D`)}</time>
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type.toLowerCase()}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${point.type + ` ` + point.town}</h3>
            <div class="event__schedule">
              ${getDatesBlock()}
              ${getDuration()}
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
    this._editPointHandler = this._editPointHandler.bind(this);
    this._favoriteHandler = this._favoriteHandler.bind(this);
  }

  _favoriteHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteHandler();
  }

  setFavoriteHandler(cb) {
    this._callback.favoriteHandler = cb;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteHandler);
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

