import TripPoint from "../view/TripPoint";
import TripPointEdit from "../view/TripPointEdit";
import {DOM_POSITIONS, renderElement} from "../utils/render";
import {isEvtEscape} from "../utils/common";


export default class Point {
  constructor(listWrapper, point) {
    this._listWrapper = listWrapper;
    this._point = point;
    this._displayForm = this._displayForm.bind(this);
    this._closeForm = this._closeForm.bind(this);
    this._displayPoint = this._displayPoint.bind(this);
    this._favoriteStatusChange = this._favoriteStatusChange.bind(this);
    this.init();
  }

  init(reRender = false) {
    if (!reRender) {
      this._pointItem = new TripPoint(this._point);
      renderElement(this._listWrapper, this._pointItem.getElement(), DOM_POSITIONS[`BEFOREEND`]);
    }
    this._pointItemEdit = new TripPointEdit(this._point);
    this._pointItem.setEditOnHandler(this._displayForm);
    this._pointItem.setFavoriteHandler(this._favoriteStatusChange);
    this._pointItemEdit.setFormSubmitHandler(this._displayPoint);

  }

  _closeForm(evt) {
    if (isEvtEscape(evt)) {
      this._displayPoint();
      document.removeEventListener(`keydown`, this._closeForm);
    }
  }

  _displayForm() {
    this._listWrapper.replaceChild(this._pointItemEdit.getElement(), this._pointItem.getElement());
    document.addEventListener(`keydown`, this._closeForm);
  }

  _favoriteStatusChange() {
    this._point = Object.assign(this._point, {'isFavorite': !this._point.isFavorite});
    let pointItem = new TripPoint(this._point);
    this._listWrapper.replaceChild(pointItem.getElement(), this._pointItem.getElement());
    this._pointItem = pointItem;
    this.init(true);
  }

  _displayPoint() {
    this._listWrapper.replaceChild(this._pointItem.getElement(), this._pointItemEdit.getElement());
    document.removeEventListener(`keydown`, this._closeForm);
  }

}
