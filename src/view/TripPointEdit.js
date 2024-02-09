import AbstractSmart from "./AbstractSmart";
import {getDateInFormat} from "../utils/date";
import {nanoid} from "nanoid";
import flatpickr from "flatpickr";
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import dayjs from "dayjs";
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import {remove} from "../utils/render";
import '../../node_modules/choices.js/public/assets/styles/choices.min.css';
import Choices from "choices.js";
import {UserActions} from "../const";

dayjs.extend(CustomParseFormat);

const POINT_DATES = {
  'event-start-time': `dateStart`,
  'event-end-time': `dateEnd`
};
const PROCESS_TEXT = {
  UPDATE: `Saving...`,
  DELETE: `Deleting...`
};

const START_TEXT = {
  UPDATE: `Save`,
  DELETE: `Delete`
};

const createTripPointForm = (point, serverData) => {

  const unicFormId = nanoid(6);

  const getDestinationInfo = () => {
    let destinationBlock = ``;

    if (point.town && serverData.destinations.has(point.town)) {
      const currentDestination = serverData.destinations.get(point.town);
      if (currentDestination.description || currentDestination.pictures.length > 0) {
        destinationBlock +=
                    `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>`;

        if (currentDestination.description) {
          destinationBlock += `<p class="event__destination-description">${currentDestination.description}</p>`;
        }
        if (currentDestination.pictures.length > 0) {
          destinationBlock += `<div class="event__photos-container">
                      <div class="event__photos-tape">`;
          currentDestination.pictures.forEach(({src, description}) => {
            destinationBlock += `<img class="event__photo" src="${src}" alt="${description}">`;
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
      if (point.offers.length > 0 && point.offers.some((pointOffer) => {
        return pointOffer.formName === offer.formName;
      })) {
        return `checked`;
      }
      return ``;
    };


    if (serverData.offers.has(point.type) && serverData.offers.get(point.type).length > 0) {
      let offersForType = serverData.offers.get(point.type);
      offersForType.forEach((offer, ind) => {
        let idField = (Math.random() + 1).toString(36).substring(3) + `_` + ind;
        offersListStr +=
                    `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.formName}-${idField}" type="checkbox" name="${offer.formName}" ${offerIsChecked(offer)}>
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
    let townsDataList = `<select class="event__input  event__input--destination" name="event-destination">`;
    if (point.town === ``) {
      townsDataList += `<option value="" selected disabled>Choose a town</option>`;
    }
    serverData.towns.forEach((town) => {
      townsDataList += `<option value="${town}">${town}</option>`;
    });
    townsDataList += `</select>`;
    return townsDataList;
  };
  const getTypesList = () => {
    let typesList = `<fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>`;

    const checkedIfCurrent = (type) => {
      if (type === point) {
        return `checked`;
      }
      return ``;
    };

    serverData.pointTypes.forEach((pointType) => {
      typesList += `<div class="event__type-item">
            <input ${checkedIfCurrent(pointType)} id="event-type-${pointType.toLowerCase()}-${unicFormId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType.toLowerCase()}">
                <label class="event__type-label  event__type-label--${pointType.toLowerCase()}" for="event-type-${pointType.toLowerCase()}-${unicFormId}">${pointType}</label>
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
                       ${getTowns()}
                  </div>
                     <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateInFormat(point.dateStart, `DD/MM/YY HH:mm`)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateInFormat(point.dateEnd, `DD/MM/YY HH:mm`)}">
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
  constructor(point = {}, serverData) {
    super();
    this._data = point;
    this._serverData = serverData;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeChangedHandler = this._typeChangedHandler.bind(this);
    this._townChangeHandler = this._townChangeHandler.bind(this);
    this._costChangeHandler = this._costChangeHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);
    this._datesChangeHandler = this._datesChangeHandler.bind(this);
    this._deleteHandler = this._deleteHandler.bind(this);
    this._setInnerHandlers();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._destroyCalendar();
    this._callback.formSubmit(this._data);
  }

  processingStart(type) {
    this.getElement().querySelector(`form`).classList.add(`area-darken`);
    switch (type) {
      case UserActions.UPDATE:
        this.getElement().querySelector(`.event__save-btn`).textContent = PROCESS_TEXT.UPDATE;
        break;
      case UserActions.DELETE:
        this.getElement().querySelector(`.event__reset-btn`).textContent = PROCESS_TEXT.DELETE;
        break;
    }
  }

  processingFailed() {
    this.getElement().querySelector(`form`).classList.add(`shake`);
    setTimeout(() => {
      this.getElement().querySelector(`form`).classList.remove(`shake`);
      this.getElement().querySelector(`form`).classList.remove(`area-darken`);
      this.getElement().querySelector(`.event__save-btn`).textContent = START_TEXT.UPDATE;
      this.getElement().querySelector(`.event__reset-btn`).textContent = START_TEXT.DELETE;
    }, 600);
  }

  _getCheckedOfferObjFromName(formName) {
    return this._serverData.offers.get(this._data.type).filter((offer) => offer.formName === formName)[0];
  }

  _offerChangeHandler() {
    let actualOffers = [...this._offerElements].filter((offer) => offer.checked).map((checkedOffer) => this._getCheckedOfferObjFromName(checkedOffer.name));
    this.updateData({offers: actualOffers}, true);
  }

  _costChangeHandler(evt) {
    evt.preventDefault();
    const cost = evt.target.value;
    this.updateData({cost});
  }

  _datesChangeHandler(evt) {
    const dateVal = evt.target.value;
    const dateName = evt.target.name;
    const format = `DD/MM/YY HH:mm`;

    if (POINT_DATES[dateName]) {
      let field = POINT_DATES[dateName];
      const parsedDate = dayjs(dateVal, format, true); // Третий параметр 'true' обеспечивает строгий разбор
      this.updateData({[field]: parsedDate});
    }
  }

  _townChangeHandler(evt) {
    evt.preventDefault();
    const town = evt.target.value;
    let destination = this._serverData.destinations.has(town) ? this._serverData.destinations.get(town) : {};
    this.updateData({town, destination}, true);
  }

  _typeChangedHandler(evt) {
    const type = evt.target.value;
    this.updateData({type, offers: []}, true);
  }

  setFormSubmitHandler(cb) {
    this._callback.formSubmit = cb;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-group`).addEventListener(`change`, this._typeChangedHandler);
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteHandler);

    const destinationElement = this.getElement().querySelector(`.event__input--destination`);
    destinationElement.addEventListener(`change`, this._townChangeHandler);
    const townSelect = new Choices(destinationElement, {
      searchEnabled: true // отключить поиск
    });
    if (this._data.town) {
      townSelect.setChoiceByValue(this._data.town);
    }
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);

    const costElement = this.getElement().querySelector(`.event__input--price`);
    costElement.addEventListener(`change`, this._costChangeHandler);
    costElement.addEventListener(`input`, function (evt) {
      evt.target.value = evt.target.value.replace(/[^0-9]/g, ``);
    });

    this._offerElements = this.getElement().querySelectorAll(`.event__offer-checkbox`);
    this._setCalendar();
    if (this._offerElements) {
      [...this._offerElements].forEach((offerElement) => {
        offerElement.addEventListener(`click`, this._offerChangeHandler);
      });
    }

  }

  _destroyCalendar() {
    this._dateToPicker.destroy();
    this._dateFromPicker.destroy();
    this._datePickerInstalled = false;
  }


  _setCalendar() {
    if (this._datePickerInstalled) {
      this._destroyCalendar();
    }
    this._datePickerInstalled = true;
    this._dateFromElement = this.getElement().querySelector(`.event__input--time[name="event-start-time"]`);
    this._dateToElement = this.getElement().querySelector(`.event__input--time[name="event-end-time"]`);

    const dateFormat = `d/m/y H:i`;
    const dayjsFormat = `DD/MM/YY HH:mm`;

    let dateStartStr = ``;
    if (this._data.dateStart) {
      dateStartStr = getDateInFormat(this._data.dateStart, dayjsFormat);
    }
    let dateEndStr = ``;
    if (this._data.dateEnd) {
      dateEndStr = getDateInFormat(this._data.dateEnd, dayjsFormat);
    }

    this._dateFromPicker = flatpickr(this._dateFromElement, {
      enableTime: true,
      dateFormat,
      maxDate: dateEndStr,
      onChange: (selectedDates) => {
        if (this._dateToPicker && selectedDates[0]) {
          this._dateToPicker.set(`minDate`, selectedDates[0]);
        }
      }
    });

    this._dateToPicker = flatpickr(this._dateToElement, {
      enableTime: true,
      dateFormat,
      minDate: dateStartStr,
      onChange: (selectedDates) => {
        if (this._dateFromPicker && selectedDates[0]) {
          this._dateFromPicker.set(`maxDate`, selectedDates[0]);
        }
      }
    });

    this._dateFromElement.addEventListener(`change`, this._datesChangeHandler);
    this._dateToElement.addEventListener(`change`, this._datesChangeHandler);
  }


  reset(data) {
    this.updateData(data, true);
  }

  smartRemove() {
    this._destroyCalendar();
    remove(this);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  getTemplate() {
    return createTripPointForm(this._data, this._serverData);
  }

  setDeleteHandler(cb) {
    this._callback.delete = cb;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteHandler);
  }

  _deleteHandler(evt) {
    evt.preventDefault();
    this._callback.delete(this._data);
  }
}
