import {displayDate} from "../utils/date";
import {pointTypes} from "../mock/consts";
import {towns, destinations, offers} from "../mock/consts";
import AbstractSmart from "./AbstractSmart";

const createTripPointForm = (point) => {

  const getDestinationInfo = () => {
    let destinationBlock = ``;
    if (point.town && destinations.has(point.town)) {
      const currentDestination = destinations.get(point.town);
      if (currentDestination.description || currentDestination.photos.length > 0) {
        destinationBlock +=
            `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>`;

        if (currentDestination.description) {
          destinationBlock += `<p class="event__destination-description">${currentDestination.description}</p>`;
        }
        if (currentDestination.photos.length > 0) {
          destinationBlock += `<div class="event__photos-container">
                      <div class="event__photos-tape">`;
          currentDestination.photos.forEach((photo) => {
            destinationBlock += `<img class="event__photo" src="${photo}" alt="Event photo">`;
          });

          destinationBlock += `</div></div>`;
        }

        destinationBlock += `</section>`;
      }
    }
    return destinationBlock;
  };

  const getOffers = () => {
    let offersListStr = `<div class="event__available-offers">`;

    const offerIsChecked = (offer) => {
      if (point.offers.length > 0 && point.offers.some((pointOffer) => pointOffer === offer)) {
        return `checked`;
      }
      return ``;
    };

    if (offers.has(point.type) && offers.get(point.type).length > 0) {
      let offersForType = offers.get(point.type);
      offersForType.forEach((offer, ind) => {
        let idField = (Math.random() + 1).toString(36).substring(3) + `_` + ind;
        offersListStr +=
                    `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.formName}-${idField}" type="checkbox" name="event-offer-${offer.formName}" ${offerIsChecked(offer)}>
                <label class="event__offer-label" for="event-offer-${offer.formName}-${idField}">
                  <span class="event__offer-title">${offer.name}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offer.cost}</span>
                </label>
              </div>`;
      });

    }
    offersListStr += `</div>`;

    return offersListStr;
  };

  const getTowns = () => {
    let townsDataList = `<datalist id="destination-list-1">`;
    towns.forEach((town) => {
      townsDataList += `<option value="${town}"></option>`;
    });
    townsDataList += `</datalist>`;
    return townsDataList;
  };
  const getTypesList = () => {
    let typesList = `<fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>`;

    const checkedIfCurrent = (type) => {
      if (type.toLowerCase() === point.type.toLowerCase()) {
        return `checked`;
      }
      return ``;
    };

    pointTypes.forEach((pointType) => {
      typesList += `<div class="event__type-item">
            <input ${checkedIfCurrent(pointType)} id="event-type-${pointType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType.toLowerCase()}">
                <label class="event__type-label  event__type-label--${pointType.toLowerCase()}" for="event-type-${pointType.toLowerCase()}-1">${pointType}</label>
        </div>`;
    });

    typesList += `</fieldset>`;
    return typesList;
  };

  return `      <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                     ${getTypesList()}
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${point.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.town}" list="destination-list-1">
                       ${getTowns()}
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${displayDate(point.dateStart, `DD/MM/YY HH:mm`)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${displayDate(point.dateEnd, `DD/MM/YY HH:mm`)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.cost}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                        ${getOffers()}
                  </section>

                  ${getDestinationInfo()}
                </section>
              </form>
            </li>`;
};


export default class TripPointEdit extends AbstractSmart {
  constructor(point) {
    super();
    this._point = point;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeChangedHandler = this._typeChangedHandler.bind(this);
    this._townChangeHandler = this._townChangeHandler.bind(this);
    this.getElement().querySelector(`.event__type-group`).addEventListener(`change`, this._typeChangedHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._townChangeHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._point);
  }

  _townChangeHandler(evt) {
    evt.preventDefault();
    const town = evt.target.value;
    this.updateData({town}, true);
  }

  _typeChangedHandler(evt) {
    const val = evt.target.value;
    const type = val[0].toUpperCase() + val.slice(1);
    this.updateData({type}, true);
  }

  setFormSubmitHandler(cb) {
    this._callback.formSubmit = cb;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }


  restoreHandlers() {
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeChangedHandler = this._typeChangedHandler.bind(this);
    this.getElement().querySelector(`.event__type-group`).addEventListener(`change`, this._typeChangedHandler);
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  getTemplate() {
    return createTripPointForm(this._point);
  }

}
