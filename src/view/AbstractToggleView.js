import AbstractView from "./AbstractView";

export default class AbstractToggleView extends AbstractView {
  constructor() {
    super();
  }

  show() {
    this.getElement().firstElementChild.parentNode.classList.remove(`visually-hidden`);
  }

  hide() {
    this.getElement().firstElementChild.parentNode.classList.add(`visually-hidden`);
  }

}
