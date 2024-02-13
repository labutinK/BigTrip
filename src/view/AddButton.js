import AbstractView from "./AbstractView";

const createAddButton = () => {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;
};

export default class AddButton extends AbstractView {

  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }
  getTemplate() {
    return createAddButton();
  }

  disable() {
    this.getElement().disabled = `true`;
  }
  enable() {
    this.getElement().removeAttribute(`disabled`);
  }

  setClickHandler(cb) {
    this._callback.click = cb;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

}
