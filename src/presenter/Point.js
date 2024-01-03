import TripPoint from "../view/TripPoint";
import TripPointEdit from "../view/TripPointEdit";
import {DOM_POSITIONS, renderElement} from "../utils/render";
import {isEvtEscape} from "../utils/common";
import {replace, remove} from "../utils/render";


export default class Point {
  constructor(listWrapper, changeData) {
    this._listWrapper = listWrapper;
    this._pointItem = null;
    this._pointItemEdit = null;
    this._displayForm = this._displayForm.bind(this);
    this._closeForm = this._closeForm.bind(this);
    this._displayPoint = this._displayPoint.bind(this);
    this._favoriteHandler = this._favoriteHandler.bind(this);
    this._submitForm = this._submitForm.bind(this);
    this._changeData = changeData;
  }

  init(point) {
    const prevPointItem = this._pointItem;
    const prevPointEditItem = this._pointItemEdit;

    this._point = point;
    this._pointItem = new TripPoint(this._point);
    this._pointItemEdit = new TripPointEdit(this._point);
    this._pointItem.setEditOnHandler(this._displayForm);
    this._pointItemEdit.setFormSubmitHandler(this._submitForm);
    this._pointItem.setFavoriteHandler(this._favoriteHandler);
    if (prevPointItem === null || prevPointEditItem === null) {
      renderElement(this._listWrapper.getElement(), this._pointItem.getElement(), DOM_POSITIONS[`BEFOREEND`]);
      return;
    }

    if (this._listWrapper.getElement().contains(prevPointItem.getElement())) {
      replace(this._pointItem, prevPointItem);
    }
    if (this._listWrapper.getElement().contains(prevPointEditItem.getElement())) {
      replace(this._pointItemEdit, prevPointEditItem);
    }

  }

  destroy() {
    remove(this._pointItem);
    remove(this._pointItemEdit);
  }

  _closeForm(evt) {
    if (isEvtEscape(evt)) {
      this._displayPoint();
      document.removeEventListener(`keydown`, this._closeForm);
    }
  }

  _displayForm() {
    replace(this._pointItemEdit.getElement(), this._pointItem.getElement());
    document.addEventListener(`keydown`, this._closeForm);
  }

  _favoriteHandler() {
    return this._changeData(
        Object.assign({}, this._point, {'isFavorite': !this._point.isFavorite})
    );
  }

  _submitForm(point) {
    this._changeData(point);
    this._displayPoint();
  }

  _displayPoint() {
    replace(this._pointItem.getElement(), this._pointItemEdit.getElement());
    document.removeEventListener(`keydown`, this._closeForm);
  }
}
