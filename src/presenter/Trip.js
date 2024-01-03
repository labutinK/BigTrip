import TripList from "../view/TripList";
import FiltersView from "../view/Filters";
import Sorts from "../view/Sort";
import TripInfoView from "../view/TripInfo";
import EmptyList from "../view/EmptyList";
import {filters, menuItems} from "../mock/consts";
import Menu from "../view/Menu";
import {DOM_POSITIONS, renderElement} from "../utils/render";
import Point from "./Point";

export default class Trip {
  constructor() {
    this._tripList = new TripList();
    this._sorts = new Sorts();
    this._emptyList = new EmptyList();
    this._filters = new FiltersView(filters);
    this._menu = new Menu(menuItems);

    this._htmlWrapper = document.querySelector(`.page-body`);
    this._htmlElements = {
      siteBody: this._htmlWrapper.querySelector(`.page-body`),
      siteHeader: this._htmlWrapper.querySelector(`.page-header`),
      headerTripWrapper: this._htmlWrapper.querySelector(`.trip-main`),
      headerNavWrapper: this._htmlWrapper.querySelector(`.trip-controls__navigation`),
      headerFilterWrapper: this._htmlWrapper.querySelector(`.trip-controls__filters`),
      contentWrapper: this._htmlWrapper.querySelector(`.trip-events`),
    };
  }

  init(points) {
    this._defaultPoints = points;
    this.tripInfo = new TripInfoView(this._defaultPoints);
    if (this._defaultPoints.length > 0) {
      this._renderTripInfo();
      this._renderSort();
      this._renderTripList();
    } else {
      this._renderEmptyTripList();
    }
    this._renderFilters();
    this._renderMenu();
  }

  _renderTripList() {
    renderElement(this._htmlElements.contentWrapper, this._tripList.getElement(), DOM_POSITIONS[`BEFOREEND`]);
    this._defaultPoints.forEach((point) => {
      let pointPresenter = new Point(this._tripList.getElement(), point);
      pointPresenter.init();
    });
  }

  _renderEmptyTripList() {
    renderElement(this._htmlElements.contentWrapper, this._emptyList.getElement(), DOM_POSITIONS[`AFTERBEGIN`]);
  }

  _renderMenu() {
    renderElement(this._htmlElements.headerNavWrapper, this._menu.getElement(), DOM_POSITIONS[`BEFOREBEGIN`]);
  }

  _renderSort() {
    renderElement(this._htmlElements.contentWrapper, this._sorts.getElement(), DOM_POSITIONS[`AFTERBEGIN`]);
  }

  _renderTripInfo() {
    renderElement(this._htmlElements.headerTripWrapper, this.tripInfo.getElement(), DOM_POSITIONS[`AFTERBEGIN`]);
  }

  _renderFilters() {
    renderElement(this._htmlElements.headerFilterWrapper, this._filters.getElement(), DOM_POSITIONS[`BEFOREBEGIN`]);
  }

}
