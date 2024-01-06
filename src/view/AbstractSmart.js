import AbstractView from "./AbstractView";
import {replace} from "../utils/render";

export default class AbstractSmart extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  restoreHandlers() {
    throw new Error(`Please, add implementation of this method.`);
  }

  updateData(updated, updateElementFlag = false) {
    this._data = Object.assign({}, this._data, updated);
    if (updateElementFlag) {
      this.updateElement();
    }
  }

  updateElement() {
    const currentElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();
    replace(newElement, currentElement);
    this.restoreHandlers();
  }
}
