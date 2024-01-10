import FiltersView from "../view/Filters";
import {DOM_POSITIONS, renderElement, replace} from "../utils/render";

export default class Filters {
  constructor(wrapper, filters, filtersModel) {
    this._wrapper = wrapper;
    this._filtersModel = filtersModel;
    this._filters = filters;
    this._activeFilter = this._filtersModel.getFilter();
    this._renderFilter();
    this._renderNewFilter = this._renderNewFilter.bind(this);
    this._filtersModel.addObserver(this._renderNewFilter);
    this._handleUpdateView = this._handleUpdateView.bind(this);
    this._filtersView.setFilterHandler(this._handleUpdateView);
  }

  _handleUpdateView(updateType, newFilter) {
    this._activeFilter = newFilter;
    this._filtersModel.setFilter(updateType, newFilter);
  }

  _renderNewFilter(type, filter) {
    this._activeFilter = filter;
    const newFilterView = new FiltersView(this._filters, this._activeFilter);
    replace(newFilterView.getElement(), this._filtersView.getElement());
    this._filtersView = newFilterView;
    this._filtersView.setFilterHandler(this._handleUpdateView);
  }


  _renderFilter() {
    this._filtersView = new FiltersView(this._filters, this._activeFilter);
    renderElement(this._wrapper, this._filtersView.getElement(), DOM_POSITIONS[`BEFOREBEGIN`]);
  }

}
