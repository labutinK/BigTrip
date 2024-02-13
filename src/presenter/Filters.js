import FiltersView from "../view/Filters";
import {DOM_POSITIONS, renderElement, replace} from "../utils/render";
import {filtersUtils} from "../utils/filter";
import {UpdateType} from "../const";

export default class Filters {
  constructor(wrapper, filters, filtersModel, PointsModel) {
    this._wrapper = wrapper;
    this._filtersModel = filtersModel;
    this._filters = filters;
    this._pointsModel = PointsModel;
    this._activeFilter = this._filtersModel.getFilter();
    this._countFilterElements = this._countFilterElements.bind(this);
    this._renderFilter();
    this._renderNewFilter = this._renderNewFilter.bind(this);
    this._filtersModel.addObserver(this._renderNewFilter);
    this._pointsModel.addObserver(this._renderNewFilter);
    this._handleUpdateView = this._handleUpdateView.bind(this);
    this._filtersView.setFilterHandler(this._handleUpdateView);
  }


  show() {
    this._filtersView.getElement().firstElementChild.parentNode.classList.remove(`visually-hidden`);
  }

  hide() {
    this._filtersView.getElement().firstElementChild.parentNode.classList.add(`visually-hidden`);
  }

  _handleUpdateView(updateType, newFilter) {
    this._activeFilter = newFilter;
    this._filtersModel.setFilter(updateType, newFilter);
  }

  _renderNewFilter(type, filter) {
    this._activeFilter = filter;
    const newFilterView = new FiltersView(this._filters, this._activeFilter, this._countFilterElements);
    replace(newFilterView.getElement(), this._filtersView.getElement());
    this._filtersView = newFilterView;
    this._filtersView.setFilterHandler(this._handleUpdateView);
  }

  _countFilterElements(filter) {
    return (filtersUtils[filter](this._pointsModel.getPoints()).length);
  }


  _renderFilter() {
    this._filtersView = new FiltersView(this._filters, this._activeFilter, this._countFilterElements);
    renderElement(this._wrapper, this._filtersView.getElement(), DOM_POSITIONS[`BEFOREBEGIN`]);
  }

}
