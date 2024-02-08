import TripList from "../view/TripList";
import Sorts from "../view/Sort";
import EmptyList from "../view/EmptyList";
import {DOM_POSITIONS, renderElement} from "../utils/render";
import Point from "./Point";
import {sortDuration, sortCost, sortDate} from "../utils/common";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import {FilterType, SORT_TYPES, UpdateType, UserActions} from "../const";
import {remove} from "../utils/render";
import {filtersUtils} from "../utils/filter";
import TripInfo from "../view/TripInfo";
import NewPoint from "./NewPoint";
import LoadingView from "../view/Loading";
import Points from "../model/Points";


dayjs.extend(duration);


export default class Trip {
  constructor(wrapper, points, filtersModel, serverData, api) {
    this._htmlWrapper = wrapper;
    this._tripList = new TripList();
    this._emptyList = new EmptyList();
    this._filtersModel = filtersModel;
    this._serverData = serverData;
    this._api = api;

    this._htmlElements = {
      siteBody: this._htmlWrapper.querySelector(`.page-body`),
      siteHeader: this._htmlWrapper.querySelector(`.page-header`),
      headerTripWrapper: this._htmlWrapper.querySelector(`.trip-main`),
      addNewBtn: this._htmlWrapper.querySelector(`.trip-main__event-add-btn`),
    };
    this.contentWrapper = this._htmlWrapper.querySelector(`.trip-events`);


    this._handleChangeView = this._handleChangeView.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleUpdateModel = this._handleUpdateModel.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._renderBoard = this._renderBoard.bind(this);
    this._handleAddNew = this._handleAddNew.bind(this);
    this._disableAddNewBtnHandler = this._disableAddNewBtnHandler.bind(this);

    this._htmlElements.addNewBtn.addEventListener(`click`, this._handleAddNew);
    this._addPointForm = new NewPoint(this._tripList, this._handleChangeView, this._disableAddNewBtnHandler, this._serverData);

    this._points = points;

    this._points.addObserver(this._handleUpdateModel);
    this._filtersModel.addObserver(this._handleUpdateModel);
    this._currentSortType = SORT_TYPES.date;
    this._pointPresenter = {};
    this._tripInfo = null;
    this._preloader();
  }

  _preloader() {
    this._preloaderView = new LoadingView();
    renderElement(this.contentWrapper, this._preloaderView.getElement(), DOM_POSITIONS[`AFTERBEGIN`]);
  }

  show() {
    this.contentWrapper.classList.remove(`visually-hidden`);
  }

  hide() {
    this.contentWrapper.classList.add(`visually-hidden`);
  }


  _renderTripList() {
    renderElement(this.contentWrapper, this._tripList.getElement(), DOM_POSITIONS[`BEFOREEND`]);
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
    } else {
      this._renderEmptyList();
    }
  }


  _disableAddNewBtnHandler() {
    this._htmlElements.addNewBtn.disabled = false;
  }

  _handleAddNew() {
    this._filtersModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this._addPointForm.init();
    this._htmlElements.addNewBtn.disabled = true;
  }

  _handleChangeView(action, type, element) {
    switch (action) {
      case UserActions.UPDATE:
        this._api.updatePoint(element.id, element)
            .then((updated) => {
              this._points.updatePoint(type, updated);
            });
        break;
      case UserActions.DELETE:
        this._api.deletePoint(element.id)
            .then(() => {
              this._points.deletePoint(type, element);
            });
        break;
      case UserActions.CREATE:
        this._api.createPoint(element)
            .then((created) => {
              this._points.createPoint(type, created);
            });
        break;
    }
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
        if (this._boardPoints.length > 0) {
          this._tripInfo = new TripInfo(this._boardPoints);
          this._renderTripInfo();
        }
        break;
      case UpdateType.INIT:
        remove(this._preloaderView);
        this._renderBoard();
        if (this._boardPoints.length > 0) {
          this._tripInfo = new TripInfo(this._boardPoints);
          this._renderTripInfo();
        }
        break;
    }
  }

  resetToDefault() {
    this._filtersModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
  }

  _renderTripItem(pointData) {
    let pointPresenter = new Point(this._tripList, this._handleChangeView, this._handleModeChange, this._serverData);
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
    this._addPointForm.destroy();

    if (resetSortType) {
      this._currentSortType = SORT_TYPES.date;
    }
    if (newTripInfo) {
      remove(this._tripInfo);
    }
  }

  _renderEmptyList() {
    renderElement(this.contentWrapper, this._emptyList.getElement(), DOM_POSITIONS[`AFTERBEGIN`]);
  }


  _handleSortTypeChange(sortType) {
    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _renderSort() {
    this._sorts = new Sorts(this._currentSortType);
    this._sorts.setResortHandler(this._handleSortTypeChange);
    renderElement(this.contentWrapper, this._sorts.getElement(), DOM_POSITIONS[`BEFOREEND`]);
  }


  _renderTripInfo() {
    renderElement(this._htmlElements.headerTripWrapper, this._tripInfo.getElement(), DOM_POSITIONS[`AFTERBEGIN`]);
  }

}
