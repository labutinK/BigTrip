import TripPoint from "../view/TripPoint";
import TripPointEdit from "../view/TripPointEdit";
import {DOM_POSITIONS, renderElement} from "../utils/render";
import {isEvtEscape} from "../utils/common";
import {replace, remove} from "../utils/render";
import {UpdateType, UserActions} from "../const";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};

export default class Point {
  constructor(listWrapper, changeData, closeOthers) {
    this._listWrapper = listWrapper;
    this._pointItem = null;
    this._pointItemEdit = null;
    this._displayForm = this._displayForm.bind(this);
    this._closeForm = this._closeForm.bind(this);
    this._displayPoint = this._displayPoint.bind(this);
    this._favoriteHandler = this._favoriteHandler.bind(this);
    this._submitForm = this._submitForm.bind(this);
    this._deletePoint = this._deletePoint.bind(this);
    this._changeData = changeData;
    this._closeOthers = closeOthers;
    this._mode = Mode.DEFAULT;
  }

  init(point) {
    const prevPointItem = this._pointItem;
    const prevPointEditItem = this._pointItemEdit;

    this._point = point;
    this._pointItem = new TripPoint(this._point);
    this._pointItemEdit = new TripPointEdit(this._point);

    this._pointItem.setEditOnHandler(this._displayForm);
    this._pointItemEdit.setFormSubmitHandler(this._submitForm);
    this._pointItemEdit.setDeleteHandler(this._deletePoint);
    this._pointItem.setFavoriteHandler(this._favoriteHandler);
    if (prevPointItem === null || prevPointEditItem === null) {
      renderElement(this._listWrapper.getElement(), this._pointItem.getElement(), DOM_POSITIONS[`BEFOREEND`]);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointItem, prevPointItem);
    }
    if (this._mode === Mode.EDITING) {
      replace(this._pointItemEdit, prevPointEditItem);
    }

    remove(prevPointItem);
    prevPointEditItem.smartRemove();
  }

  destroy() {
    remove(this._pointItem);
    this._pointItemEdit.smartRemove();
  }

  _closeForm(evt) {
    if (isEvtEscape(evt)) {
      this._pointItemEdit.reset(this._point);
      this._displayPoint();
      document.removeEventListener(`keydown`, this._closeForm);
    }
  }

  _displayForm() {
    this._closeOthers(this._point.id);
    this._mode = Mode.EDITING;
    replace(this._pointItemEdit.getElement(), this._pointItem.getElement());
    document.addEventListener(`keydown`, this._closeForm);
  }

  _favoriteHandler() {
    return this._changeData(
        UserActions.UPDATE,
        UpdateType.PATCH,
        Object.assign({}, this._point, {'isFavorite': !this._point.isFavorite})
    );
  }

  _submitForm(point) {
    this._changeData(UserActions.UPDATE, UpdateType.MINOR, point);
    this._displayPoint();
  }

  resetView() {
    if (this._mode === Mode[`EDITING`]) {
      this._displayPoint();
    }
  }

  _displayPoint() {
    replace(this._pointItem.getElement(), this._pointItemEdit.getElement());
    document.removeEventListener(`keydown`, this._closeForm);
    this._mode = Mode.DEFAULT;
  }


  _deletePoint(point) {
    this._changeData(UserActions.DELETE, UpdateType.MAJOR, point);
  }
}
