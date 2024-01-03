import TripList from "../view/TripList";
import FiltersView from "../view/Filters";
import Sorts from "../view/Sort";
import TripInfoView from "../view/TripInfo";
import EmptyList from "../view/EmptyList";
import {filters, menuItems} from "../mock/consts";
import Menu from "../view/Menu";
import {DOM_POSITIONS, renderElement} from "../utils/render";
import {createPoint} from "../view/createPoint";

const siteBodyElement = document.querySelector(`.page-body`);
const siteHeaderElement = siteBodyElement.querySelector(`.page-header`);
const headerTripWrapper = siteHeaderElement.querySelector(`.trip-main`);
const headerNavWrapper = siteHeaderElement.querySelector(`.trip-controls__navigation`);
const headerFiltersWrapper = siteHeaderElement.querySelector(`.trip-controls__filters`);
const contentWrapper = siteBodyElement.querySelector(`.trip-events`);

export default class Trip {
  constructor() {
    this._tripList = new TripList();
    this._sorts = new Sorts();
    this._emptyList = new EmptyList();
    this._filters = new FiltersView(filters);
    this._menu = new Menu(menuItems);
  }

  init(points) {
    this._defaultPoints = points;
    this.tripInfo = new TripInfoView(this._defaultPoints);
    if (this._defaultPoints.length > 0) {
      renderElement(headerTripWrapper, this.tripInfo.getElement(), DOM_POSITIONS[`AFTERBEGIN`]);
      renderElement(contentWrapper, this._sorts.getElement(), DOM_POSITIONS[`AFTERBEGIN`]);
      renderElement(contentWrapper, this._tripList.getElement(), DOM_POSITIONS[`BEFOREEND`]);
      this._defaultPoints.forEach((point) => {
        createPoint(this._tripList.getElement(), point);
      });
    } else {
      renderElement(contentWrapper, this._emptyList.getElement(), DOM_POSITIONS[`AFTERBEGIN`]);
    }
    renderElement(headerFiltersWrapper, this._filters.getElement(), DOM_POSITIONS[`BEFOREBEGIN`]);
    renderElement(headerNavWrapper, this._menu.getElement(), DOM_POSITIONS[`BEFOREBEGIN`]);
  }
}
