import TripList from "../view/TripList";
import FiltersView from "../view/Filters";
import Sorts from "../view/Sort";
import TripInfoView from "../view/TripInfo";
import EmptyList from "../view/EmptyList";
import {filters, menuItems} from "../mock/consts";
import Menu from "../view/Menu";
import {DOM_POSITIONS, renderElement, replace} from "../utils/render";
import Point from "./Point";
import {sortDuration, sortCost, sortDate, updateItem} from "../utils/common";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import {SORT_TYPES, UpdateType, UserActions} from "../const";
import {remove} from "../utils/render";
import Filter from "../model/Filter";
import {filtersUtils} from "../utils/filter";
import TripInfo from "../view/TripInfo";

dayjs.extend(duration);


export default class Trip {
  constructor(wrapper, points, filtersModel) {
    this._htmlWrapper = wrapper;
    this._tripList = new TripList();
    this._emptyList = new EmptyList();
    this._menu = new Menu(menuItems);
    this._filtersModel = filtersModel;

    this._htmlElements = {
      siteBody: this._htmlWrapper.querySelector(`.page-body`),
      siteHeader: this._htmlWrapper.querySelector(`.page-header`),
      headerTripWrapper: this._htmlWrapper.querySelector(`.trip-main`),
      headerNavWrapper: this._htmlWrapper.querySelector(`.trip-controls__navigation`),
      contentWrapper: this._htmlWrapper.querySelector(`.trip-events`),
    };
    this._handleUpdateView = this._handleUpdateView.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleUpdateModel = this._handleUpdateModel.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._points = points;

    this._points.addObserver(this._handleUpdateModel);
    this._filtersModel.addObserver(this._handleUpdateModel);
    this._currentSortType = SORT_TYPES.date;
    this._pointPresenter = {};
    this._tripInfo = null;
    this._renderBoard();
  }


  _renderTripList() {
    renderElement(this._htmlElements.contentWrapper, this._tripList.getElement(), DOM_POSITIONS[`BEFOREEND`]);
    this._boardPoints.forEach((point) => {
      this._renderTripItem(point);
    });
  }

  _renderBoard() {
    switch (this._currentSortType) {
      case SORT_TYPES.date:
        this._boardPoints = filtersUtils[this._filtersModel.getFilter()](this._points.getPoints().sort(sortDate));
        break;
      case SORT_TYPES.time:
        this._boardPoints = filtersUtils[this._filtersModel.getFilter()](this._points.getPoints().sort(sortDuration));
        break;
      case SORT_TYPES.price:
        this._boardPoints = filtersUtils[this._filtersModel.getFilter()](this._points.getPoints().sort(sortCost));
        break;
    }
    if (this._boardPoints.length > 0) {
      this._renderSort();
      this._renderTripList();
      if (this._tripInfo === null) {
        this._tripInfo = new TripInfo(this._boardPoints);
        this._renderTripInfo();
      }
    } else {
      this._renderEmptyList();
    }


    // this._renderMenu();
  }

  _handleUpdateView(updated) {
    this._points.updatePoint(UpdateType.MINOR, updated);
  }

  _handleUpdateModel(type, item = {}) {
    switch (type) {
      case UpdateType.PATCH:
        this._pointPresenter[item.id].init(item);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true, newTripInfo: true});
        this._renderBoard();
        this._tripInfo = new TripInfo(this._boardPoints);
        this._renderTripInfo();
        break;
    }
  }

  _renderTripItem(pointData) {
    let pointPresenter = new Point(this._tripList, this._handleUpdateView, this._handleModeChange);
    this._pointPresenter[pointData.id] = pointPresenter;
    pointPresenter.init(pointData);
  }

  _handleModeChange() {
    Object.values(this._pointPresenter).forEach((pointPresenter) => pointPresenter.resetView());
  }

  _clearBoard({resetSortType = false, newTripInfo = false} = {}) {
    for (let renderedPoint of Object.values(this._pointPresenter)) {
      renderedPoint.destroy();
    }
    remove(this._sorts);
    remove(this._emptyList);
    this._pointPresenter = {};

    if (resetSortType) {
      this._currentSortType = SORT_TYPES.date;
    }
    if (newTripInfo) {
      remove(this._tripInfo);
    }
  }

  _renderEmptyList() {
    renderElement(this._htmlElements.contentWrapper, this._emptyList.getElement(), DOM_POSITIONS[`AFTERBEGIN`]);
  }

  _renderMenu() {
    renderElement(this._htmlElements.headerNavWrapper, this._menu.getElement(), DOM_POSITIONS[`BEFOREBEGIN`]);
  }

  _handleSortTypeChange(sortType) {
    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _renderSort() {
    this._sorts = new Sorts(this._currentSortType);
    this._sorts.setResortHandler(this._handleSortTypeChange);
    renderElement(this._htmlElements.contentWrapper, this._sorts.getElement(), DOM_POSITIONS[`AFTERBEGIN`]);
  }


  _renderTripInfo() {
    renderElement(this._htmlElements.headerTripWrapper, this._tripInfo.getElement(), DOM_POSITIONS[`AFTERBEGIN`]);
  }

}
