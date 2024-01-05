import AbstractView from "./AbstractView";
import {replace} from "../utils/render";

export default class AbstractSmart extends AbstractView {
  constructor() {
    super();
  }

  restoreHandlers() {
    throw new Error(`Please, add implementation of this method.`);
  }

  updateData(updated, updateElementFlag = false) {
    this._point = Object.assign({}, this._point, updated);
    if (updateElementFlag) {
      this.updateElement();
    }
    this.restoreHandlers();
  }

  updateElement() {
    const currentElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();
    console.log(this._point);
    replace(newElement, currentElement);
  }
}
