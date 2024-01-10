import TripPointAdd from "../view/TripPointAdd";
import {DOM_POSITIONS, renderElement} from "../utils/render";
import {isEvtEscape} from "../utils/common";
import {replace, remove} from "../utils/render";
import {UpdateType, UserActions} from "../const";
import {generatePoint} from "../mock/point";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};

export default class NewPoint {
  constructor(listWrapper, changeData, btnDisableCb) {
    this._listWrapper = listWrapper;
    this._pointItemEdit = null;
    this._closeForm = this._closeForm.bind(this);
    this._submitForm = this._submitForm.bind(this);
    this._changeData = changeData;
    this._btnDisableCb = btnDisableCb;
    this._pointItemEdit = null;
  }

  init() {
    if (this._pointItemEdit !== null) {
      this._pointItemEdit.smartRemove();
    }
    this._point = generatePoint(true);
    this._pointItemEdit = new TripPointAdd(this._point);
    this._pointItemEdit.setCloseFormHandler(this._btnDisableCb);
    this._pointItemEdit.setFormSubmitHandler(this._submitForm);
    renderElement(this._listWrapper.getElement(), this._pointItemEdit.getElement(), DOM_POSITIONS[`AFTERBEGIN`]);
    document.addEventListener(`keydown`, this._closeForm);
  }

  destroy() {
    this._pointItemEdit.smartRemove();
  }

  _closeForm(evt) {
    if (isEvtEscape(evt)) {
      this._pointItemEdit.reset(this._point);
      document.removeEventListener(`keydown`, this._closeForm);
      this.destroy();
    }
  }


  _submitForm(point) {
    this._changeData(UserActions.CREATE, UpdateType.MAJOR, point);
    this.destroy();
  }
}
