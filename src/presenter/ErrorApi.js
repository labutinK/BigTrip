import ErrorApiView from "../view/ErrorApi";
import {DOM_POSITIONS, remove, renderElement} from "../utils/render";
export default class ErrorApi {
  constructor(htmlWrapper) {
    this._wrapper = htmlWrapper.querySelector(`.trip-events`);
  }

  init(errorMessage) {
    this._errorView = new ErrorApiView(errorMessage);
    renderElement(this._wrapper, this._errorView.getElement(), DOM_POSITIONS[`AFTEREND`]);
  }

  destroy() {
    remove(this._errorView);
  }
}
