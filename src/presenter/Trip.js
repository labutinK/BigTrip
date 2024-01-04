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
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);


export default class Trip {
  constructor(wrapper) {
    this._htmlWrapper = wrapper;
    this._tripList = new TripList();
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
    this._resortHandler = this._resortHandler.bind(this);
  }

  init(points) {
    this._boardPoints = points;
    this._renderDateSort();
    this._pointPresenter = {};
    this.tripInfo = new TripInfoView(this._boardPoints);
    this._renderBoard();
  }

  _renderTripList() {
    if (this._boardPoints.length > 0) {
      renderElement(this._htmlElements.contentWrapper, this._tripList.getElement(), DOM_POSITIONS[`BEFOREEND`]);
      this._boardPoints.forEach((point) => {
        this._renderTripItem(point);
      });
    } else {
      this._renderEmptyList();
    }
  }

  _renderBoard() {
    this._renderTripInfo();
    this._renderSort();
    this._renderTripList();
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

  _resortHandler(sortName) {
    this._removeList();
    if (sortName === `date`) {
      this._renderDateSort();
    } else if (sortName === `time`) {
      this._renderTimeSort();
    } else if (sortName === `price`) {
      this._renderPriceSort();
    }
    this._renderTripList();
  }

  _renderDateSort() {
    this._boardPoints.sort(function (a, b) {
      return dayjs(b.dateStart).isBefore(a.dateStart, `minute`);
    });
  }

  _renderTimeSort() {
    this._boardPoints.sort(function (a, b) {
      return dayjs(a.dateStart).diff(dayjs(a.dateEnd), `minute`) - dayjs(b.dateStart).diff(dayjs(b.dateEnd), `minute`);
    });
  }

  _renderPriceSort() {
    this._boardPoints.sort((a, b) => a.cost < b.cost);
  }

  _renderSort() {
    this._sorts = new Sorts();
    this._sorts.setResortHandler(this._resortHandler);
    renderElement(this._htmlElements.contentWrapper, this._sorts.getElement(), DOM_POSITIONS[`AFTERBEGIN`]);
  }


  _renderTripInfo() {
    renderElement(this._htmlElements.headerTripWrapper, this.tripInfo.getElement(), DOM_POSITIONS[`AFTERBEGIN`]);
  }

  _renderFilters() {
    renderElement(this._htmlElements.headerFilterWrapper, this._filters.getElement(), DOM_POSITIONS[`BEFOREBEGIN`]);
  }

}
