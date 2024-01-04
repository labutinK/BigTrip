import TripList from "../view/TripList";
import FiltersView from "../view/Filters";
import Sorts from "../view/Sort";
import TripInfoView from "../view/TripInfo";
import EmptyList from "../view/EmptyList";
import {filters, menuItems} from "../mock/consts";
import Menu from "../view/Menu";
import {DOM_POSITIONS, renderElement} from "../utils/render";
import Point from "./Point";
import {updateItem} from "../utils/common";

export default class Trip {
  constructor(wrapper) {
    this._htmlWrapper = wrapper;
    this._tripList = new TripList();
    this._sorts = new Sorts();
    this._emptyList = new EmptyList();
    this._filters = new FiltersView(filters);
    this._menu = new Menu(menuItems);

    this._htmlElements = {
      siteBody: this._htmlWrapper.querySelector(`.page-body`),
      siteHeader: this._htmlWrapper.querySelector(`.page-header`),
      headerTripWrapper: this._htmlWrapper.querySelector(`.trip-main`),
      headerNavWrapper: this._htmlWrapper.querySelector(`.trip-controls__navigation`),
      headerFilterWrapper: this._htmlWrapper.querySelector(`.trip-controls__filters`),
      contentWrapper: this._htmlWrapper.querySelector(`.trip-events`),
    };
    this._handleUpdateItem = this._handleUpdateItem.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(points) {
    this._boardPoints = points;
    this._pointPresenter = {};
    this.tripInfo = new TripInfoView(this._boardPoints);
    this._renderTripList();
  }

  _renderTripList() {
    if (this._boardPoints.length > 0) {
      this._renderTripInfo();
      this._renderSort();
      renderElement(this._htmlElements.contentWrapper, this._tripList.getElement(), DOM_POSITIONS[`BEFOREEND`]);
      this._boardPoints.forEach((point) => {
        this._renderTripItem(point);
      });
    } else {
      this._renderEmptyList();
    }
    this._renderFilters();
    this._renderMenu();
  }

  _handleUpdateItem(updatedPoint) {
    this._boardPoints = updateItem(this._boardPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderTripItem(pointData) {
    let pointPresenter = new Point(this._tripList, this._handleUpdateItem, this._handleModeChange);
    this._pointPresenter[pointData.id] = pointPresenter;
    pointPresenter.init(pointData);
  }

  _handleModeChange() {
    Object.values(this._pointPresenter).forEach((pointPresenter) => pointPresenter.resetView());
  }

  _removeList() {
    for (let renderedPoint of Object.values(this._pointPresenter)) {
      renderedPoint.destroy();
    }
    this._pointPresenter = {};
  }

  _renderEmptyList() {
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
